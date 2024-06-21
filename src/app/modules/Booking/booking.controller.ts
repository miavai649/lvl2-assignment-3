import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDb(
    req.user.userEmail,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDb();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const getUsersBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getUsersBookingFromDb(
    req.user.userEmail,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUsersBooking,
};
