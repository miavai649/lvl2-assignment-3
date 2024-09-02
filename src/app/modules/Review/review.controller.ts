import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ReviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDb(
    req.user.userEmail,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getAllReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDb();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews data retrieved successfully",
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReview,
};
