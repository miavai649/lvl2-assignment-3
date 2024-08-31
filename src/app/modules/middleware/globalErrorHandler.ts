/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import handleZodError from "../errors/handleZodError";
import { TErrorMessages } from "../interface/error";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import CustomAppError from "../errors/CustomAppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  const stack = err.stack;

  let errorMessages: TErrorMessages = [
    { path: "", message: "Something went wrong!" },
  ];

  if (err?.name === "ZodError") {
    const errorRes = handleZodError(err);
    statusCode = errorRes.statusCode;
    message = errorRes.message;
    errorMessages = errorRes.errorMessages;
  } else if (err?.name === "ValidationError") {
    const errorRes = handleValidationError(err);
    statusCode = errorRes.statusCode;
    message = errorRes.message;
    errorMessages = errorRes.errorMessages;
  } else if (err?.name === "CastError") {
    const errorRes = handleCastError(err);
    statusCode = errorRes.statusCode;
    message = errorRes.message;
    errorMessages = errorRes.errorMessages;
  } else if (err?.code === 11000) {
    const errorRes = handleDuplicateError(err);
    statusCode = errorRes.statusCode;
    message = errorRes.message;
    errorMessages = errorRes.errorMessages;
  } else if (err instanceof CustomAppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    err,
    stack,
  });
};

export default globalErrorHandler;
