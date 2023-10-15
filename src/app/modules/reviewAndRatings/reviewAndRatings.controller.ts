import catchAsync from "../../../shared/catch-async"
import responseData from "../../../shared/response";
import { IValidateUser } from "../auth/auth.interface"
import { ReviewAndRatingService } from "./reviewAndRatings.service";

const insertReviewAndRating = catchAsync(async (req, res) => {
  const reviewAndRating = req.body;
  
  const user = (req as any).user as IValidateUser
  if(user)
    reviewAndRating.userId = user.userId
  
  const result = await ReviewAndRatingService.insertReviewAndRating(reviewAndRating);
  
  return responseData({ message: "Review And Rating inserted  successfully", result }, res);
});

const updateReviewAndRating = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = (req as any).user as IValidateUser
  if(user)
   data.userId = user.userId
  const result = await ReviewAndRatingService.updateReviewAndRating(id, data);

  return responseData({ message: "Review And Rating updated  successfully", result }, res);
});

const deleteReviewAndRating = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ReviewAndRatingService.deleteReviewAndRating(id);

  return responseData({ message: "ReviewAndRating deleted  successfully", result }, res);
});

const findOneReviewAndRating = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ReviewAndRatingService.findOneReviewAndRating(id);
  return responseData({ message: "ReviewAndRating fetched successfully", result }, res);
});

const findReviewAndRatings = catchAsync(async (req, res) => {
  const result = await ReviewAndRatingService.findReviewAndRatings();
  return responseData({ message: "ReviewAndRatings retrieved successfully", result }, res);
});

export const ReviewAndRatingController = {
  insertReviewAndRating,
  updateReviewAndRating,
  deleteReviewAndRating,
  findOneReviewAndRating,
  findReviewAndRatings,
};
