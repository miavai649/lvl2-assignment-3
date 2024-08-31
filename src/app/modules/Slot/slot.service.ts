import httpStatus from 'http-status'
import { Service } from '../Service/service.model'
import CustomAppError from '../errors/CustomAppError'
import { TSlot } from './slot.interface'
import { Slot } from './slot.model'

const createSlotIntoDb = async (payload: TSlot) => {
  const service = await Service.findById(payload?.service)

  // check if the service is exist or not
  if (!service) {
    throw new CustomAppError(httpStatus.NOT_FOUND, 'Service not found')
  }

  // get the service duration
  const duration = service?.duration

  const startTime = payload?.startTime.split(':')
  const endTime = payload?.endTime.split(':')

  const startTimeInMinutes = Number(startTime[0]) * 60 + Number(startTime[1])
  const endTimeInMinutes = Number(endTime[0]) * 60 + Number(endTime[1])

  const TotalServiceDuration = endTimeInMinutes - startTimeInMinutes

  const numberOfSlots = TotalServiceDuration / duration

  const slots = []
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = startTimeInMinutes + i * duration
    const slotEndTime = slotStartTime + duration

    const slot = {
      service: payload.service,
      date: payload.date,
      startTime: `${Math.floor(slotStartTime / 60)
        .toString()
        .padStart(2, '0')}:${(slotStartTime % 60).toString().padStart(2, '0')}`,
      endTime: `${Math.floor(slotEndTime / 60)
        .toString()
        .padStart(2, '0')}:${(slotEndTime % 60).toString().padStart(2, '0')}`,
      isBooked: 'available'
    }

    slots.push(slot)
  }

  const result = await Slot.insertMany(slots)
  return result
}

const getAllSlotsFromDb = async (query: Record<string, unknown>) => {
  const { date, serviceId } = query

  const filter: Record<string, unknown> = {}

  if (date) {
    filter['date'] = date
  }
  if (serviceId) {
    filter['service'] = serviceId
  }

  const result = await Slot.find(filter).sort('-createdAt').populate('service')
  return result
}

const updateSlotStatusIntoDb = async (id: string, payload: Partial<TSlot>) => {
  const result = await Slot.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteSlotFromDb = async (id: string) => {
  const result = await Slot.findByIdAndDelete(id)
  return result
}

export const SlotServices = {
  createSlotIntoDb,
  getAllSlotsFromDb,
  updateSlotStatusIntoDb,
  deleteSlotFromDb
}
