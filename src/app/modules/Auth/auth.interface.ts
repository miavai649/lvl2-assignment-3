export type TRole = "admin" | "user";

export type TSignup = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
};
