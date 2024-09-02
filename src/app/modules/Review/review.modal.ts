import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
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

export const Review = model<TReview>("Review", reviewSchema);
