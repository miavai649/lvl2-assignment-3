import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Service",
    },
    date: {
      type: String,
      require: true,
    },
    startTime: {
      type: String,
      require: true,
    },
    endTime: {
      type: String,
      require: true,
    },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      },
    },
  },
);

export const Slot = model<TSlot>("Slot", slotSchema);
