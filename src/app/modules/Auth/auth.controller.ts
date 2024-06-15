import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signUp(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const AuthController = {
  signUp,
};
