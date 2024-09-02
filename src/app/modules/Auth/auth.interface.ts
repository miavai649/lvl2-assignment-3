import { Model } from "mongoose";
import { User_Role } from "./auth.constant";

export type TSignup = {
  image?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof User_Role;

export interface AuthModel extends Model<TSignup> {
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): boolean;
}
