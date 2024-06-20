import { z } from "zod";
import { VEHICLE_TYPES } from "./booking.constant";

const createBookingValidationSchema = z.object({
  body: z.object({
    serviceId: z.string({ required_error: "Service id is required" }),
    slotId: z.string({ required_error: "Slot id is required" }),
    vehicleType: z.enum([...VEHICLE_TYPES] as [string, ...string[]]),
    vehicleBrand: z.string({ required_error: "Vehicle brand is required" }),
    vehicleModel: z.string({ required_error: "Vehicle model is required" }),
    manufacturingYear: z.number({
      required_error: "Manufacturing year is required",
    }),
    registrationPlate: z.string({
      required_error: "Vehicle registration number is required",
    }),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
};
