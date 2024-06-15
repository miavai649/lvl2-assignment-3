import { Request, Response } from "express";
import { authValidation } from "./auth.validation";
import { AuthServices } from "./auth.service";
import catchAsync from "../utils/catchAsync";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const singUpdata = req.body;

  const zodParsedSignupData =
    authValidation.signupValidationSchema.parse(singUpdata);

  const result = await AuthServices.signUp(zodParsedSignupData);

  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const AuthController = {
  signUp,
};
