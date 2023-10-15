import express from 'express'
import { ReviewAndRatingController } from './reviewAndRatings.controller'
import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'
import { ReviewAndRatingValidation } from './reviewAndRatings.validation'
import validateRequest from '../../middlewares/validate-request'

const router = express.Router()

router.route('/create-review-rating').post(validateRequest(ReviewAndRatingValidation.createReviewAndRatingZodSchema), auth(Role.customer), ReviewAndRatingController.insertReviewAndRating)

router.route('/')
.get(ReviewAndRatingController.findReviewAndRatings)

router.route('/:id')
.get(ReviewAndRatingController.findOneReviewAndRating)
.patch(validateRequest(ReviewAndRatingValidation.updateReviewAndRatingZodSchema), auth(Role.customer), ReviewAndRatingController.updateReviewAndRating)
.delete(auth(Role.customer), ReviewAndRatingController.deleteReviewAndRating)

export const ReviewAndRatingRouter = router