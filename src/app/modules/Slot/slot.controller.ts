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