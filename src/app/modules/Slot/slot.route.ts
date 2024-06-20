import express from "express";
import { SlotControllers } from "./slot.controller";
import { User_Role } from "../Auth/auth.constant";
import auth from "../middleware/auth";

const router = express.Router();

router.get(
  "/availability",
  auth(User_Role.admin, User_Role.user),
  SlotControllers.getAllSlots,
);

export const SlotRoutes = router;
