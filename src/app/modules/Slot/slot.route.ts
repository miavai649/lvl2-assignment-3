import express from 'express'
import { SlotControllers } from './slot.controller'
import { User_Role } from '../Auth/auth.constant'
import auth from '../middleware/auth'

const router = express.Router()

router.get('/availability', SlotControllers.getAllSlots)
router.get('/:id', auth(User_Role.user), SlotControllers.getSingleSlot)
router.put('/:id', auth(User_Role.admin), SlotControllers.updateSlotStatus)
router.delete('/:id', auth(User_Role.admin), SlotControllers.deleteSlot)

export const SlotRoutes = router
