import config from "../../config";
import CustomAppError from "../errors/CustomAppError";
import { TLogin, TSignup } from "./auth.interface";
import { Auth } from "./auth.model";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const signUp = async (payload: TSignup) => {
  const result = await Auth.create(payload);
  return result;
};

const logIn = async (payload: TLogin) => {
  const user = await Auth.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new CustomAppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!(await Auth.isPasswordMatched(payload.password, user.password))) {
    throw new CustomAppError(httpStatus.FORBIDDEN, "Password is incorrect");
  }

  const jwtPayload = {
    userEmail: user?.email,
    userRole: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: config.jwt_access_token_expires_in as string,
  });

  const responseData = await Auth.findOne({ email: payload.email }).select(
    "-__v",
  );

  return {
    accessToken,
    responseData,
  };
};

export const AuthServices = {
  signUp,
  logIn,
};
