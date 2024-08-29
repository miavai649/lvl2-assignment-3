import jwt, { JwtPayload } from "jsonwebtoken";
import CustomAppError from "../errors/CustomAppError";
import httpStatus from "http-status";

export const createToken = (
  jwtPayload: { userEmail: string; userRole: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new CustomAppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
};
