import express from 'express'

import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'
import { VehicleController } from './vehicles.controller'
import validateRequest from '../../middlewares/validate-request'
import { VehicleValidation } from './vehicles.validation'

const router = express.Router()

router.route('/create-vehicle').post(validateRequest(VehicleValidation.createVehicleZodSchema), auth(Role.admin), VehicleController.insertVehicle)

router.route('/').get(VehicleController.findVehicles)

router.route('/:categoryId/category').get(VehicleController.findVehicleByCategory)
router.route('/:id')
.get(VehicleController.findOneVehicle)
.patch(validateRequest(VehicleValidation.updateVehicleZodSchema),auth(Role.admin), VehicleController.updateVehicle)
.delete(auth(Role.admin), VehicleController.deleteVehicle)

export const VehicleRouter = router