import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import config from "../../config";
import httpStatus from "http-status";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signUp(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
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
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    data: responseData,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

export const AuthController = {
  signUp,
  logIn,
  refreshToken,
};
