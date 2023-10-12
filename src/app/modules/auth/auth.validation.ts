import { z } from "zod";
const signInAuthZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "ID is required!",
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
    }),
  }),
});

export const AuthValidation = {
  signInAuthZodSchema,
  signUpAuthZodSchema,
};
