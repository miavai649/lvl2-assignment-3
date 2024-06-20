import express from "express";
import { AuthRoutes } from "../Auth/auth.route";
import { ServiceRoutes } from "../Service/service.route";
import { SlotRoutes } from "../Slot/slot.route";
import { BookingRoutes } from "../Booking/booking.route";

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
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
