import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { SlotServices } from "./slot.service";

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDb(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDb(req.query);

  // if the database collection is empty or query is unmatched
  if (!result.length) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAllSlots,
};
