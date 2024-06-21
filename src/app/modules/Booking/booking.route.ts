import express from "express";
import { BookingControllers } from "./booking.controller";
import auth from "../middleware/auth";
import { User_Role } from "../Auth/auth.constant";
import validateRequest from "../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  auth(User_Role.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
);
router.get("/", auth(User_Role.admin), BookingControllers.getAllBookings);

export const BookingRoutes = router;
