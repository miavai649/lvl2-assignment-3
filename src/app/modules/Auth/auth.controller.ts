import { NextFunction, Request, Response } from "express";
import { authValidation } from "./auth.validation";
import { AuthServices } from "./auth.service";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singUpdata = req.body;

    const zodParsedSignupData =
      authValidation.signupValidationSchema.parse(singUpdata);

    const result = await AuthServices.signUp(zodParsedSignupData);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AuthController = {
  signUp,
};
