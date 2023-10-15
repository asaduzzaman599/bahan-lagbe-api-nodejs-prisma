import { z } from "zod";
const createContentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required!",
    }),
    description: z.string({
      required_error: "Description is required!",
    }),
    imageUrl: z.string({
      required_error: "Description is required!",
    }).optional(),
  }),
});

const updateContentZodSchema = z.object({
  body: z.object({
    title: z.string({
    required_error: "Title is required!",
  }).optional(),
  description: z.string({
    required_error: "Description is required!",
  }).optional(),
  imageUrl: z.string({
    required_error: "Description is required!",
  }).optional(),
  }),
});

export const ContentValidation = {
  createContentZodSchema,
  updateContentZodSchema,
};
