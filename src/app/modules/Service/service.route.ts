import express from "express";
import { ServiceControllers } from "./service.controller";
import validateRequest from "../middleware/validateRequest";
import { ServiceValidation } from "./service.validation";
import { SlotValidation } from "../Slot/slot.validation";
import { SlotControllers } from "../Slot/slot.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceControllers.createService,
);
router.get("/:id", ServiceControllers.getSingleService);
router.get("/", ServiceControllers.getAllService);
router.put(
  "/:id",
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceControllers.updateService,
);
router.delete("/:id", ServiceControllers.deleteService);

// create slots for Service
router.post(
  "/slots",
  validateRequest(SlotValidation.createSlotValidationSchema),
  SlotControllers.createSlot,
);

export const ServiceRoutes = router;
