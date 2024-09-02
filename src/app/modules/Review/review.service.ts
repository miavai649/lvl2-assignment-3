import httpStatus from "http-status";
import { Auth } from "../Auth/auth.model";
import CustomAppError from "../errors/CustomAppError";
import { TReview } from "./review.interface";
import { Review } from "./review.modal";

const createReviewIntoDb = async (
  userEmail: string,
  payload: Record<string, unknown>,
) => {
  const user = await Auth.findOne({ email: userEmail });

  // check if the user is exist or not
  if (!user) {
    throw new CustomAppError(httpStatus.NOT_FOUND, "User not found");
  }

  const bookingData: Partial<TReview> = {
    user: user._id,
    review: payload.review as string,
    rating: payload.rating as number,
  };

  const result = await Review.create(bookingData);
  return result;
};

const getAllReviewsFromDb = async () => {
  const result = await Review.find().sort("-createdAt").populate("user");
  return result;
};

export const ReviewServices = {
  createReviewIntoDb,
  getAllReviewsFromDb,
};
