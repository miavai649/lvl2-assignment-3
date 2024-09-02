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
router.get("/me", auth(User_Role.admin, User_Role.user), AuthController.getMe);
router.put("/user/:id", auth(User_Role.admin), AuthController.updateUserRole);
router.put("/me/:id", auth(User_Role.user), AuthController.updateUser);

export const AuthRoutes = router;
