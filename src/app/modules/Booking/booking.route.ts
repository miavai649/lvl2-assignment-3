import express from "express";
import { BookingControllers } from "./booking.controller";
import auth from "../middleware/auth";
import { User_Role } from "../Auth/auth.constant";
import validateRequest from "../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";

const router1 = express.Router();
const router2 = express.Router();

router1.post(
  "/",
  auth(User_Role.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
);
router1.get("/", auth(User_Role.admin), BookingControllers.getAllBookings);

router2.get("/", auth(User_Role.user), BookingControllers.getUsersBooking);

export const BookingRoutes = router1;
export const MyBookingRoutes = router2;
