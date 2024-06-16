import httpStatus from "http-status";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import CustomAppError from "../errors/CustomAppError";

const createServiceIntoDb = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getSingleServiceFromDb = async (id: string) => {
  const result = await Service.findById(id);

  if (result?.isDeleted) {
    throw new CustomAppError(httpStatus.FORBIDDEN, "This Service is deleted");
  }

  return result;
};

const getAllServicesFromDb = async () => {
  const result = await Service.find({ isDeleted: false });
  return result;
};

const updateServiceIntoDb = async (id: string, payload: Partial<TService>) => {
  const service = await Service.findById(id);

  // check if the service is exist or not and if exist then checking if the data is deleted or not
  if (!service || service.isDeleted) {
    throw new CustomAppError(
      httpStatus.NOT_FOUND,
      "Service not found or has been deleted",
    );
  }

  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteServiceIntoDb = async (id: string) => {
  const isServiceExists = await Service.findById(id);

  // check if the service is exist or not
  if (!isServiceExists) {
    throw new CustomAppError(httpStatus.NOT_FOUND, "Service not found");
  }

  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDb,
  getSingleServiceFromDb,
  getAllServicesFromDb,
  updateServiceIntoDb,
  deleteServiceIntoDb,
};
