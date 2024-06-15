import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../middleware/validateRequest";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(authValidation.signupValidationSchema),
  AuthController.signUp,
);

export const AuthRoutes = router;
