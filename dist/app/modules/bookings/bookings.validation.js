"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string({
            required_error: "Start time and date is required!",
        }),
        endTime: zod_1.z.string({
            required_error: "End time and date is required!",
        }),
        vehicleId: zod_1.z.string({
            required_error: "End time and date is required!",
        }),
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string({
            required_error: "Start time and date is required!",
        }).optional(),
        endTime: zod_1.z.string({
            required_error: "End time and date is required!",
        }).optional(),
        vehicleId: zod_1.z.string({
            required_error: "End time and date is required!",
        }).optional(),
        status: zod_1.z.enum([
            "PENDING",
            "BOOKED",
            "CANCELLED",
            "REJECT",
            "COMPLETED",
        ], {
            required_error: "End time and date is required!",
        }).optional(),
    }),
});
exports.BookingValidation = {
    createBookingZodSchema,
    updateBookingZodSchema,
};
