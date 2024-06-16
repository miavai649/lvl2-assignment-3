import express from "express";
import { AuthRoutes } from "../Auth/auth.route";
import { ServiceRoutes } from "../Service/service.route";

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
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
