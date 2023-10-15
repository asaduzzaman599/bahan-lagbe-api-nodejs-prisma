import express from 'express'
import { BookingController } from './bookings.controller'
import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validate-request'
import { BookingValidation } from './bookings.validation'

const router = express.Router()

router.route('/create-booking')
.post(validateRequest(BookingValidation.createBookingZodSchema), auth(Role.customer), BookingController.insertBooking)

router.route('/')
.get(auth(Role.super_admin, Role.admin, Role.customer),BookingController.findBookings)

router.route('/:vehicleId/vehicle').get(auth(Role.super_admin,Role.admin),BookingController.findBookingByVehicle)

router.route('/:id')
.get(auth(Role.super_admin, Role.admin, Role.customer),BookingController.findOneBooking)
.patch(validateRequest(BookingValidation.updateBookingZodSchema),auth(Role.admin, Role.super_admin, Role.customer))

export const BookingRouter = router