import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../middleware/auth";
import { User_Role } from "./auth.constant";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.signupValidationSchema),
  AuthController.signUp,
);
router.post(
  "/login",
  validateRequest(AuthValidation.logInValidationSchema),
  AuthController.logIn,
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);
router.get("/users", auth(User_Role.admin), AuthController.getAllUsers);

export const AuthRoutes = router;
