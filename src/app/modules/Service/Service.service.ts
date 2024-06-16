import { TService } from "./service.interface";
import { Service } from "./service.model";

const createServiceIntoDb = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getSingleServiceFromDb = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

export const ServiceServices = {
  createServiceIntoDb,
  getSingleServiceFromDb,
};