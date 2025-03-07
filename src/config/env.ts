import { config } from "dotenv";
import { z } from "zod";

const EnvSchema = z.object({
  DB_URL: z
    .string({
      required_error: "DB_URL is required",

      message: "DB_URL is required and must be a string",
    })
    .nonempty(),
  SERVER_PORT: z
    .string({
      message: "Server Port is greater than 2000",
    })
    .refine((value) => {
      return parseInt(value) > 2000;
    }),
  JWT_SECRET_KEY: z
    .string({
      message: "JWT_SECRET_KEY is required and must be a string",
    })
    .nonempty(),
  JWT_EXPIRES_IN: z
    .string({
      message: "JWT_EXPIRES_IN is required and must be a string.Exm:7d",
    })
    .nonempty(),
  REFRESH_TOKEN_SECRET_KEY: z
    .string({
      message: "REFRESH_TOKEN_SECRET_KEY is required and must be a string",
    })
    .nonempty(),
  REFRESH_TOKEN_EXPIRES_IN: z
    .string({
      message:
        "REFRESH_TOKEN_EXPIRES_IN is required and must be a string.Exm:7d",
    })
    .nonempty(),
  RATE_LIMITER_WINDOW: z.coerce
    .number({
      message: "RATE_LIMITER_WINDOW is required and must be a string.Exm:1000",
    })
    .int(),
  RATE_LIMITER_MAX: z.coerce
    .number({
      message: "RATE_LIMITER_MAX is required and must be a string.Exm:1000",
    })
    .int(),
  RATE_LIMITER_DELAY: z.coerce
    .number({
      message: "RATE_LIMITER_DELAY is required and must be a string.Exm:1000",
    })
    .int(),
  V1: z
    .string({
      message: "PREFIX is required and must be a string.Exm:api/v1",
    })
    .nonempty(),
  NODE_ENV: z
    .string({
      message: "NODE_ENV is required and must be a string.Exm:development",
    })
    .nonempty(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

config();

try {
  EnvSchema.parse(process.env);
} catch (error: any) {
  if (error instanceof z.ZodError) {
    for (const err of error.errors) {
      console.error(err.message);
    }
  } else {
    console.error(error.errors);
    process.exit(1);
  }
}

export default EnvSchema.parse(process.env);
