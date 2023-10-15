import express from 'express'
import { FeedbackController } from './feedbacks.controller'
import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'
import { FeedbackValidation } from './feedbacks.validation'
import validateRequest from '../../middlewares/validate-request'

const router = express.Router()

router.route('/create-feedback').post(validateRequest(FeedbackValidation.updateFeedbackZodSchema), auth(Role.customer, 'public'), FeedbackController.insertFeedback)

router.route('/')
.get(FeedbackController.findFeedbacks)

router.route('/:id')
.get(FeedbackController.findOneFeedback)
.patch(validateRequest(FeedbackValidation.updateFeedbackZodSchema), auth(Role.customer, 'any'), FeedbackController.updateFeedback)
.delete(auth(Role.customer, 'any'), FeedbackController.deleteFeedback)

export const FeedbackRouter = router