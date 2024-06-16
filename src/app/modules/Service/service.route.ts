import express from "express";
import { ServiceControllers } from "./service.controller";

const router = express.Router();

router.post("/", ServiceControllers.createService);

export const ServiceRoutes = router;
