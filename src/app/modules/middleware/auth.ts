import httpStatus from 'http-status'
import CustomAppError from '../errors/CustomAppError'
import catchAsync from '../utils/catchAsync'
import { JwtPayload } from 'jsonwebtoken'
import { TUserRole } from '../Auth/auth.interface'
import { Auth } from '../Auth/auth.model'
import { verifyToken } from '../Auth/auth.utils'
import config from '../../config'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const tokenWithBearer = req.headers.authorization

    // check if the token is given
    if (!tokenWithBearer) {
      throw new CustomAppError(
        httpStatus.UNAUTHORIZED,
        'Please provide the token in the header first'
      )
    }

    const token = tokenWithBearer.split(' ')[1]

    // verifying the given token
    const decoded = verifyToken(token, config.jwt_access_token as string)

    const { userEmail, userRole } = decoded

    const user = await Auth.findOne({ email: userEmail })

    // checking if the user is exist
    if (!user) {
      throw new CustomAppError(httpStatus.UNAUTHORIZED, 'User not found')
    }

    // checking if the user have that authorization
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new CustomAppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route'
      )
    }

    req.user = decoded as JwtPayload

    next()
  })
}

export default auth
