import express from "express";
import { User_Role } from "../Auth/auth.constant";
import auth from "../middleware/auth";
import { ReviewControllers } from "./review.controller";
const router = express.Router();

router.post("/", auth(User_Role.user), ReviewControllers.createReview);
router.get("/", ReviewControllers.getAllReview);
export const ReviewRoutes = router;
