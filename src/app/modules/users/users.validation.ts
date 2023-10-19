import {z} from 'zod';

const createUserValidation = z.object({
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
    }).optional(),
    role: z.string().optional(),
    contactNo: z.string({
      required_error: "Contact no is required!",
    }),
    address: z.string({
      required_error: "Address is required!",
    }).optional(),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }).optional(),
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email().optional(),
    password: z.string({
      required_error: "Password is required!",
    }).optional(),
    role: z.string().optional(),
    contactNo: z.string({
      required_error: "Contact no is required!",
    }).optional(),
    address: z.string({
      required_error: "Address is required!",
    }).optional(),
  }),
});


export const UserValidation = {
  createUserValidation,
  updateUserValidation,
};

