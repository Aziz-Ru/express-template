import { config } from "dotenv";

config();

const {
  PORT,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  DB_URL,
  MAX_RATE_LIMIT,
} = process.env;

export const port = PORT || 3000;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const dbUrl = DB_URL;
export const maximumRateLimit = MAX_RATE_LIMIT || 1000;
export const rateLimitWindow = 10 * 60 * 1000;
export const prefix = "/api/v1";
export const apiDocsPath = "/api-docs";
