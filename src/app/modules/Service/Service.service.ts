import { TService } from "./service.interface";
import { Service } from "./service.model";

const createServiceIntoDb = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

export const ServiceServices = {
  createServiceIntoDb,
};
