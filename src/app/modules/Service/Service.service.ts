import httpStatus from 'http-status'
import { TService } from './service.interface'
import { Service } from './service.model'
import CustomAppError from '../errors/CustomAppError'

const createServiceIntoDb = async (payload: TService) => {
  const result = await Service.create(payload)
  return result
}

const getSingleServiceFromDb = async (id: string) => {
  const result = await Service.findById(id)
  return result
}

const getAllServicesFromDb = async () => {
  const result = await Service.find()
  return result
}

const updateServiceIntoDb = async (id: string, payload: TService) => {
  const isServiceExists = await Service.findById(id)

  if (!isServiceExists) {
    throw new CustomAppError(httpStatus.NOT_FOUND, 'Service not found')
  }

  const result = await Service.findByIdAndUpdate(id, payload, { new: true })
  return result
}

export const ServiceServices = {
  createServiceIntoDb,
  getSingleServiceFromDb,
  getAllServicesFromDb,
  updateServiceIntoDb
}
