import catchAsync from '../utils/catchAsync'
import sendResponse from '../utils/sendResponse'
import { ServiceServices } from './Service.service'

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDb(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service created successfully',
    data: result
  })
})

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await ServiceServices.getSingleServiceFromDb(id)

  // if no matching data is found
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No Data Found',
      data: []
    })
  }

  // if matching data is found
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service retrieved successfully',
    data: result
  })
})

const getAllService = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServicesFromDb()

  // if database collection is empty
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No Data Found',
      data: []
    })
  }

  // if database collection have at least on document
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Services retrieved successfully',
    data: result
  })
})

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await ServiceServices.updateServiceIntoDb(id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service updated successfully',
    data: result
  })
})

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await ServiceServices.deleteServiceIntoDb(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service deleted successfully',
    data: result
  })
})

export const ServiceControllers = {
  createService,
  getSingleService,
  getAllService,
  updateService,
  deleteService
}
