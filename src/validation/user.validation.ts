import { z } from "zod";

export const createUser = {
  body: z.object({
    email: z
      .string({
        message: "Email is required",
      })
      .email(),
    password: z
      .string({
        message: "Password is required",
      })
      .min(6)
      .max(128),
  }),
};

export const getUser = {
  params: z.object({
    userId: z.string().uuid(),
  }),
};

export const getUsers = {
  query: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    sortBy: z.string().optional(),
    limit: z.string().optional(),
    page: z.string().optional(),
  }),
};

export const updateUser = {
  params: z.object({
    userId: z
      .string({
        message: "User ID is required",
      })
      .uuid(),
  }),
  body: z.object({
    email: z
      .string({
        message: "Email is required",
      })
      .email()
      .optional(),
    password: z
      .string({
        message: "Password is required",
      })
      .min(6)
      .max(128)
      .optional(),
    name: z
      .string({
        message: "Name is required",
      })
      .optional(),
  }),
};
