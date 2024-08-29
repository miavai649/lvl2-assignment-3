import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import CustomAppError from '../errors/CustomAppError'
import httpStatus from 'http-status'

export const createToken = (
  jwtPayload: { userEmail: string; userRole: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn
  })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwt_access_token as string) as JwtPayload
  } catch (error) {
    throw new CustomAppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
  }
}
