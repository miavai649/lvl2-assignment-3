import express from 'express'
import { ServiceControllers } from './service.controller'
import validateRequest from '../middleware/validateRequest'
import { ServiceValidation } from './service.validation'
import { SlotValidation } from '../Slot/slot.validation'
import { SlotControllers } from '../Slot/slot.controller'
import auth from '../middleware/auth'
import { User_Role } from '../Auth/auth.constant'

const router = express.Router()

router.post(
  '/',
  auth(User_Role.admin),
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceControllers.createService
)
router.get('/:id', ServiceControllers.getSingleService)
router.get('/', ServiceControllers.getAllService)

router.put(
  '/:id',
  auth(User_Role.admin),
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceControllers.updateService
)
router.delete('/:id', auth(User_Role.admin), ServiceControllers.deleteService)

// create slots for Service
router.post(
  '/slots',
  auth(User_Role.admin),
  validateRequest(SlotValidation.createSlotValidationSchema),
  SlotControllers.createSlot
)

export const ServiceRoutes = router
