import express from 'express'
import { ServiceControllers } from './service.controller'
import validateRequest from '../middleware/validateRequest'
import { ServiceValidation } from './service.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceControllers.createService
)
router.get('/:id', ServiceControllers.getSingleService)
router.get('/', ServiceControllers.getAllService)
router.put(
  '/:id',
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceControllers.updateService
)
router.delete('/:id', ServiceControllers.deleteService)

export const ServiceRoutes = router
