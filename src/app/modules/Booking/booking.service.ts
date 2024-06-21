/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from "mongoose";
import { Auth } from "../Auth/auth.model";
import { TBooking, TVehicleType } from "./booking.interface";
import CustomAppError from "../errors/CustomAppError";
import httpStatus from "http-status";
import { Booking } from "./booking.model";
import { Slot } from "../Slot/slot.model";
import { Service } from "../Service/service.model";

const createBookingIntoDb = async (
  userEmail: string,
  payload: Record<string, unknown>,
) => {
  const user = await Auth.findOne({ email: userEmail });

  // check if the user is exist or not
  if (!user) {
    throw new CustomAppError(httpStatus.NOT_FOUND, "User not found");
  }

  // finding service for validations
  const service = await Service.findById(payload.serviceId);

  // finding slot for validations
  const slot = await Slot.findById(payload.slotId);

  // check if the service is exist or not
  if (!service) {
    throw new CustomAppError(httpStatus.NOT_FOUND, "Service not found");
  }

  // check if the service is deleted or not
  if (service?.isDeleted) {
    throw new CustomAppError(
      httpStatus.BAD_REQUEST,
      "Service has been deleted",
    );
  }

  // check if the slot is exist or not and also the slot is valid or not
  if (!slot || !slot.service.equals(service._id)) {
    throw new CustomAppError(
      httpStatus.BAD_REQUEST,
      "Invalid slot or slot not found",
    );
  }

  // check if the slot is available or not
  if (slot?.isBooked === "booked" || slot?.isBooked === "canceled") {
    throw new CustomAppError(httpStatus.BAD_REQUEST, "Slot is not available");
  }

  const bookingData: Partial<TBooking> = {
    customer: user._id,
    service: payload.serviceId as Types.ObjectId,
    slot: payload.slotId as Types.ObjectId,
    vehicleType: payload.vehicleType as TVehicleType,
    vehicleBrand: payload.vehicleBrand as string,
    vehicleModel: payload.vehicleModel as string,
    manufacturingYear: payload.manufacturingYear as number,
    registrationPlate: payload.registrationPlate as string,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking = await Booking.create([bookingData], { session });

    if (!booking.length) {
      throw new CustomAppError(
        httpStatus.BAD_REQUEST,
        "Failed to booking slot",
      );
    }

    const updateSlotStatus = await Slot.findByIdAndUpdate(
      payload.slotId,
      { isBooked: "booked" },
      { new: true, session },
    );

    if (!updateSlotStatus) {
      throw new CustomAppError(
        httpStatus.BAD_REQUEST,
        "Failed to update the slot status",
      );
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Booking.findById(booking[0]?._id)
      .populate({
        path: "customer",
        select: "-createdAt -updatedAt",
      })
      .populate({
        path: "service",
        select: "-createdAt -updatedAt",
      })
      .populate({
        path: "slot",
        select: "-createdAt -updatedAt",
      });

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllBookingsFromDb = async () => {
  const result = await Booking.find()
    .populate({
      path: "customer",
      select: "-createdAt -updatedAt",
    })
    .populate({
      path: "service",
      select: "-createdAt -updatedAt",
    })
    .populate({
      path: "slot",
      select: "-createdAt -updatedAt",
    });

  return result;
};

export const BookingServices = {
  createBookingIntoDb,
  getAllBookingsFromDb,
};
