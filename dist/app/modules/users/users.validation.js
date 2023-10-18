"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required!",
        })
            .email(),
        password: zod_1.z.string({
            required_error: "Password is required!",
        }).optional(),
        role: zod_1.z.string().optional(),
        contactNo: zod_1.z.string({
            required_error: "Contact no is required!",
        }),
        address: zod_1.z.string({
            required_error: "Address is required!",
        }),
    }),
});
const updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }).optional(),
        email: zod_1.z
            .string({
            required_error: "Email is required!",
        })
            .email().optional(),
        password: zod_1.z.string({
            required_error: "Password is required!",
        }).optional(),
        role: zod_1.z.string().optional(),
        contactNo: zod_1.z.string({
            required_error: "Contact no is required!",
        }).optional(),
        address: zod_1.z.string({
            required_error: "Address is required!",
        }).optional(),
    }),
});
exports.UserValidation = {
    createUserValidation,
    updateUserValidation,
};
