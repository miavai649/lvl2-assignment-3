import { z } from "zod";

const createSlotValidationSchema = z.object({
  body: z
    .object({
      service: z.string({ required_error: "Service is required" }),
      date: z.string({
        required_error: "Date is required",
      }),
      startTime: z
        .string({
          required_error: "Start time is required",
        })
        .refine(
          (time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time);
          },
          {
            message:
              'Invalid time format , expected "HH:MM" in 24 hours format',
          },
        ),
      endTime: z.string({
        required_error: "End time is required",
      }),
      isBooked: z.enum(["available", "booked", "canceled"]).optional(),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: "Start time should be before End time !  ",
      },
    ),
});

export const SlotValidation = {
  createSlotValidationSchema,
};
