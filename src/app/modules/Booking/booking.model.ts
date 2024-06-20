import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { VEHICLE_TYPES } from "./booking.constant";

const bookingSchema = new Schema<TBooking>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  service: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Service",
  },
  slot: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Slot",
  },
  vehicleType: {
    type: String,
    enum: VEHICLE_TYPES,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleBrand: {
    type: String,
    required: true,
  },
  manufacturingYear: {
    type: Number,
    required: true,
  },
  registrationPlate: {
    type: String,
    required: true,
  },
});

export const Booking = model<TBooking>("Booking", bookingSchema);
