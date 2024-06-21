import express from "express";
import { AuthRoutes } from "../Auth/auth.route";
import { ServiceRoutes } from "../Service/service.route";
import { SlotRoutes } from "../Slot/slot.route";
import { BookingRoutes, MyBookingRoutes } from "../Booking/booking.route";

const router = express.Router();

// all available routes
const allRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/my-bookings",
    route: MyBookingRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
