/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import handleZodError from "../errors/handleZodError";
import { TErrorMessages } from "../interface/error";
import handleValidationError from "../errors/handleValidationError";

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
  }
  /*
    {
    "success": false,
    "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }"
        }
    ],
    "stack": "jkh"
}
  */

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    error: err,
    stack,
  });
};

export default globalErrorHandler;
