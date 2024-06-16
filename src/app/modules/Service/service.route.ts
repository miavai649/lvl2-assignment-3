import express from "express";
import { ServiceControllers } from "./service.controller";

const router = express.Router();

router.post("/", ServiceControllers.createService);
router.get("/:id", ServiceControllers.getSingleService);
router.get("/", ServiceControllers.getAllService);

export const ServiceRoutes = router;
