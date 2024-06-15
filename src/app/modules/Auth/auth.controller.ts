import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../utils/catchAsync";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signUp(req.body);

  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const AuthController = {
  signUp,
};
