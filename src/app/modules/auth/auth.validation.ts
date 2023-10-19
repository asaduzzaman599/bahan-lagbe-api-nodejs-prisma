import { z } from "zod";
const signInAuthZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required!",
    }),
    password: z.string({
      required_error: "password is required!",
    }),
  }),
});

const signUpAuthZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email(),
    password: z.string({
      required_error: "Password is required!",
    }),
    role: z.string().optional(),
    contactNo: z.string({
      required_error: "Contact no is required!",
    }),
    address: z.string({
      required_error: "Address is required!",
    }).optional(),
    profileImg:  z.string({
      required_error: "Profile image is required!",
    }).optional()
  }),
});

const resetPasswordAuthZodSchema = z.object({
  body: z.object({
    newPassword: z.string({
      required_error: "new password is required!",
    }),
    oldPassword: z.string({
      required_error: "Old password is required!",
    }),
  }),
});

export const AuthValidation = {
  signInAuthZodSchema,
  signUpAuthZodSchema,
  resetPasswordAuthZodSchema
};
