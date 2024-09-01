import catchAsync from '../utils/catchAsync'
import sendResponse from '../utils/sendResponse'
import { SlotServices } from './slot.service'

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDb(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slots created successfully',
    data: result
  })
})

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDb(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Available slots retrieved successfully',
    data: result
  })
})

const getSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SlotServices.getSingleSlotsFromDb(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Available slots retrieved successfully',
    data: result
  })
})

const updateSlotStatus = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await SlotServices.updateSlotStatusIntoDb(id, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update slot status successfully',
    data: result
  })
})

const deleteSlot = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await SlotServices.deleteSlotFromDb(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delete slot successfully',
    data: result
  })
})

export const SlotControllers = {
  createSlot,
  getAllSlots,
  updateSlotStatus,
  deleteSlot,
  getSingleSlot
}
