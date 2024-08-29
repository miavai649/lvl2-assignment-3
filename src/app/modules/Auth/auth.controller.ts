import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import config from "../../config";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signUp(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const logIn = catchAsync(async (req, res) => {
  const result = await AuthServices.logIn(req.body);

  const { accessToken, responseData, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    refreshToken: refreshToken,
    data: responseData,
  });
});

export const AuthController = {
  signUp,
  logIn,
};
