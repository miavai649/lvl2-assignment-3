import httpStatus from "http-status";
import CustomAppError from "../errors/CustomAppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TUserRole } from "../Auth/auth.interface";
import { Auth } from "../Auth/auth.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const tokenWithBearer = req.headers.authorization;

    // check if the token is given
    if (!tokenWithBearer) {
      throw new CustomAppError(
        httpStatus.UNAUTHORIZED,
        "Please provide the token in the header first",
      );
    }

    const token = tokenWithBearer.split(" ")[1];

    // verifying the given token
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;

    const { userEmail, userRole } = decoded;

    const user = await Auth.findOne({ email: userEmail });

    // checking if the user is exist
    if (!user) {
      throw new CustomAppError(httpStatus.UNAUTHORIZED, "User not found");
    }

    // checking if the user have that authorization
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new CustomAppError(
        httpStatus.FORBIDDEN,
        "You are not authorized to perform this action",
      );
    }

    next();
  });
};

export default auth;
