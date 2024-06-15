import { TSignup } from "./auth.interface";
import { Auth } from "./auth.model";

const signUp = async (payload: TSignup) => {
  const result = await Auth.create(payload);
  return result;
};

export const AuthServices = {
  signUp,
};
