import httpStatus from "http-status"
import prismaClient from "../../../shared/prisma-client"
import {BookingStatus, ReviewAndRating} from "@prisma/client";
import ApiError from "../../../errors/api-error"

const insertReviewAndRating = async (payload: ReviewAndRating): Promise<ReviewAndRating> => {
  const reviewAndRatingExist = await prismaClient.reviewAndRating.findFirst({
    where: {
      userId: payload.userId,
      bookingId: payload.userId
    }
  })
  if(reviewAndRatingExist) throw new ApiError(httpStatus.CONFLICT,'Review and rating already exist!')

  const booking = await prismaClient.booking.findUnique({
    where:{
      id: payload.bookingId
    }
  })
  if(booking?.status !== BookingStatus.COMPLETED)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Review and rating only for completed booking!')

  const createdReviewAndRating = await prismaClient.reviewAndRating.create({
    data: payload
  })


  return createdReviewAndRating
}

const updateReviewAndRating = async (id:string, payload: ReviewAndRating): Promise<ReviewAndRating | null> => {
  
  const reviewAndRatingExist = await prismaClient.reviewAndRating.findUnique({
    where: {
      id
    }
  })

  if(!reviewAndRatingExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'Review and rating not exists')

  const reviewAndRating = await prismaClient.reviewAndRating.update({
    where: {
      id
    },
    data: payload
  })

  return reviewAndRating
}
 
const deleteReviewAndRating = async (id:string): Promise<ReviewAndRating | null> => {
  
  const reviewAndRatingExist = await prismaClient.reviewAndRating.findUnique({
    where: {
      id
    },
  })

  if(!reviewAndRatingExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'Review and rating not exists')

  const reviewAndRating = await prismaClient.reviewAndRating.delete({
    where: {
      id
    }
  })

  return reviewAndRatingExist
}

const findOneReviewAndRating = async (id: string): Promise<ReviewAndRating | null> => {
  const reviewAndRatingExist = await prismaClient.reviewAndRating.findUnique({
    where: {
      id
    },
  })

  if(!reviewAndRatingExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'review and rating not exists')

  return reviewAndRatingExist
}

const findReviewAndRatings = async (): Promise<ReviewAndRating[]> => {
  const reviewAndRatings = await prismaClient.reviewAndRating.findMany({
    include: {
      user:{
        select:{
          name: true,
          profileImg: true
        }
      }
    }
  })

  return reviewAndRatings
}

export const ReviewAndRatingService = {
  insertReviewAndRating,
  updateReviewAndRating,
  deleteReviewAndRating,
  findOneReviewAndRating,
  findReviewAndRatings
}