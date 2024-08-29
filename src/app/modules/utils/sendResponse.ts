import { Response } from 'express'
import { TResponse } from '../interface/response'

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  if (data?.token) {
    res.status(data.statusCode).json({
      success: data.success,
      statusCode: data.statusCode,
      token: data.token,
      message: data.message,
      data: data.data
    })
  } else {
    res.status(data.statusCode).json({
      success: data.success,
      statusCode: data.statusCode,
      message: data.message,
      data: data.data
    })
  }
}

export default sendResponse
