import express from "express";
import { ServiceControllers } from "./service.controller";

const router = express.Router();

router.post("/", ServiceControllers.createService);
router.get("/:id", ServiceControllers.getSingleService);

export const ServiceRoutes = router;
