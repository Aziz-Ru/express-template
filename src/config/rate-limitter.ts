import rateLimit from "express-rate-limit";
import { maximumRateLimit } from ".";
const limitter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: parseInt(maximumRateLimit as string),
  message: { msg: "Too many requests, please try again later." },
  statusCode: 429,
  headers: true,
});

export default limitter;
