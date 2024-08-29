import config from '../../config'
import CustomAppError from '../errors/CustomAppError'
import { TLogin, TSignup } from './auth.interface'
import { Auth } from './auth.model'
import httpStatus from 'http-status'
import { createToken, verifyToken } from './auth.utils'

const signUp = async (payload: TSignup) => {
  const result = await Auth.create(payload)
  return result
}

const logIn = async (payload: TLogin) => {
  const user = await Auth.findOne({ email: payload.email }).select('+password')
  if (!user) {
    throw new CustomAppError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (!(await Auth.isPasswordMatched(payload.password, user.password))) {
    throw new CustomAppError(httpStatus.FORBIDDEN, 'Password is incorrect')
  }

  const jwtPayload = {
    userEmail: user?.email,
    userRole: user?.role
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expires_in as string
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_token_expires_in as string
  )

  const responseData = await Auth.findOne({ email: payload.email }).select(
    '-__v'
  )

  return {
    accessToken,
    refreshToken,
    responseData
  }
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_token as string)

  const { userEmail } = decoded

  // checking if the user is exist
  const user = await Auth.findOne({ email: userEmail })

  if (!user) {
    throw new CustomAppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  const jwtPayload = {
    userEmail: user.email,
    userRole: user.role
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expires_in as string
  )

  return {
    accessToken
  }
}

export const AuthServices = {
  signUp,
  logIn,
  refreshToken
}
