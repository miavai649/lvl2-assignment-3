import { Request, Response } from "express";
import { authValidation } from "./auth.validation";
import { AuthServices } from "./auth.service";

const signUp = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error,
    });
  }
};

export const AuthController = {
  signUp,
};
