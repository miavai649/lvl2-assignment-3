import httpStatus from "http-status";
import mongoose from "mongoose";
import { TErrorMessages, TErrorResponse } from "../interface/error";

const handleCastError = (error: mongoose.Error.CastError): TErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = error.message;

  const errorMessages: TErrorMessages = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleCastError;
