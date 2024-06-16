import { z } from "zod";

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Service name is required",
    }),
    description: z.string({
      required_error: "Service description is required",
    }),
    price: z
      .number({
        required_error: "Service price is required",
      })
      .nonnegative("Service price must be a non-negative number"),
    duration: z
      .number({
        required_error: "Service duration is required",
      })
      .nonnegative("Service duration must be a non-negative number"),
    isDeleted: z.boolean().optional(), // isDeleted is optional since it has a default value
  }),
});

const updateServiceValidationSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      price: z
        .number()
        .nonnegative("Service price must be a non-negative number")
        .optional(),
      duration: z
        .number()
        .nonnegative("Service duration must be a non-negative number")
        .optional(),
    })
    .strict(),
});

export const ServiceValidation = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
