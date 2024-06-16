import { Model } from "mongoose";

export type TSignup = {
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

export interface AuthModel extends Model<TSignup> {
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): boolean;
}
