/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TErrorMessages } from "../interface/error";

const handleDuplicateError = (error: any) => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = error.errorResponse.errmsg;

  const errorMessages: TErrorMessages = [
    {
      path: " ",
      message: error.errorResponse.errmsg,
    },
  ];

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleDuplicateError;
