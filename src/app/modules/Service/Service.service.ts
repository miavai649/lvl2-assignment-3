import httpStatus from "http-status";
import { TService, TServiceQueries } from "./service.interface";
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

const getAllServicesFromDb = async (queries?: TServiceQueries) => {
  const filter: { [key: string]: any } = {};
  const sort: { [key: string]: 1 | -1 } = {};

  if (queries) {
    const { duration, search, sort: sortOrder } = queries;

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (duration !== undefined) {
      filter.duration = { $lte: Number(duration) };
    }

    if (sortOrder === "ascending") {
      sort.price = 1;
    } else if (sortOrder === "descending") {
      sort.price = -1;
    }
  }

  if (Object.keys(sort).length === 0) {
    sort.createdAt = -1;
  }

  const result = await Service.find(filter).sort(sort);
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
