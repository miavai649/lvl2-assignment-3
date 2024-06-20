import express from "express";
import { BookingControllers } from "./booking.controller";
import auth from "../middleware/auth";
import { User_Role } from "../Auth/auth.constant";

const router = express.Router();

router.post("/", auth(User_Role.user), BookingControllers.createBooking);

export const BookingRoutes = router;
