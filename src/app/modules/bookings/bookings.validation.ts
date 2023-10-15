import { z } from "zod";
const createBookingZodSchema = z.object({
  body: z.object({
    startTime: z.string({
      required_error: "Start time and date is required!",
    }),
    endTime: z.string({
      required_error: "End time and date is required!",
    }),
    vehicleId: z.string({
      required_error: "End time and date is required!",
    }),
  }),
});

const updateBookingZodSchema = z.object({
  body: z.object({
    startTime: z.string({
      required_error: "Start time and date is required!",
    }).optional(),
    endTime: z.string({
      required_error: "End time and date is required!",
    }).optional(),
    vehicleId: z.string({
      required_error: "End time and date is required!",
    }).optional(),
    status: z.enum([
      "PENDING",
      "BOOKED",
      "CANCELLED",
      "REJECT",
      "COMPLETED",
    ],{
      required_error: "End time and date is required!",
    }).optional(),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
