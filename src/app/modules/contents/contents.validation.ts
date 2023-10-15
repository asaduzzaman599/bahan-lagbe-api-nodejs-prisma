import { z } from "zod";
const createContentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required!",
    }),
  }),
});

const updateContentZodSchema = z.object({
  body: z.object({title: z.string({
    required_error: "Title is required!",
  }).optional(),
  }),
});

export const ContentValidation = {
  createContentZodSchema,
  updateContentZodSchema,
};
