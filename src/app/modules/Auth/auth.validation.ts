import { z } from "zod";

const signupValidationSchema = z.object({
  body: z.object({
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
  }),
});

const logInValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const AuthValidation = {
  signupValidationSchema,
  logInValidationSchema,
};
