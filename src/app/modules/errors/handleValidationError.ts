import httpStatus from "http-status";
import mongoose from "mongoose";
import { TErrorMessages, TErrorResponse } from "../interface/error";

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = error.message;

  const errorMessages: TErrorMessages = Object.values(error.errors).map(
    (value) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleValidationError;
