"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signInAuthZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email is required!",
        }),
        password: zod_1.z.string({
            required_error: "password is required!",
        }),
    }),
});
const signUpAuthZodSchema = zod_1.z.object({
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
        }),
        role: zod_1.z.string().optional(),
        contactNo: zod_1.z.string({
            required_error: "Contact no is required!",
        }),
        address: zod_1.z.string({
            required_error: "Address is required!",
        }).optional(),
        profileImg: zod_1.z.string({
            required_error: "Profile image is required!",
        }).optional()
    }),
});
exports.AuthValidation = {
    signInAuthZodSchema,
    signUpAuthZodSchema,
};
