import { z } from "zod";

export const userValidationModel = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(128, { message: "Password must be at most 128 characters long" }),
  phoneNumber: z
    .string({
      message: "Phone number is required",
    })
    .refine(
      (value: string) => {
        const phoneRegex = /^[0-9]{11}$/;
        return phoneRegex.test(value);
      },
      { message: "Invalid phone number" }
    ),
  gender: z.enum(["MALE", "FEMALE"], { message: "Invalid Gender" }),
  platform: z.enum(["WEB", "ANDROID", "IOS"], { message: "Invalid Platform" }),
  photoUrl: z.string().optional(),
  deviceId: z.string().optional(),
});

export type userModel = z.infer<typeof userValidationModel>;
