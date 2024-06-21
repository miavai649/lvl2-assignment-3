import { ZodError, ZodIssue } from "zod";
import { TErrorMessages, TErrorResponse } from "../interface/error";
import httpStatus from "http-status";

const handleZodError = (error: ZodError): TErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = error.message;
  const errorMessages: TErrorMessages = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleZodError;
