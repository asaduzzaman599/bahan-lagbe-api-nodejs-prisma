import { z } from "zod";
const createReviewAndRatingZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: "review is required!",
    }),
    rating: z.number({
      required_error: "rating is required!",
    }),
    bookingId: z.string({
      required_error: "Booking id is required!",
    }),
  }),
});

const updateReviewAndRatingZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: "review is required!",
    }).optional(),
    rating: z.number({
      required_error: "rating is required!",
    }).optional(),
  bookingId: z.string({
    required_error: "Booking id is required!",
  }).optional(),
  }),
});

export const ReviewAndRatingValidation = {
  createReviewAndRatingZodSchema,
  updateReviewAndRatingZodSchema,
};
