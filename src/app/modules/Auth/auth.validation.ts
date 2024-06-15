import { z } from "zod";
import { Role } from "./auth.constant";

const signupValidationSchema = z.object({
  // body: z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .max(12, { message: "Password can not be more than 12 characters" }),
  phone: z.string({ required_error: "Phone number is required" }),
  role: z.enum(["admin", "user"]),
  address: z.string({ required_error: "Address is required" }),
  // })
});

export const authValidation = {
  signupValidationSchema,
};
