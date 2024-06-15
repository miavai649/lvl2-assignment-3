import express from "express";
import { AuthRoutes } from "../Auth/auth.route";

const router = express.Router();

// all available routes
const allRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;