import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import env from "./config/env";
import { errorConverter, errorHandler } from "./middlewares/error";
import { configureMiddleware } from "./middlewares/middleware";
import routes from "./routes";
import ApiError from "./utils/ApiError";

// create an express app.
const app = express();

// Middlewares
configureMiddleware(app);
// Routes
app.use(env.V1, routes);

// 404 route.
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Error handling middleware.
app.use(errorConverter);
app.use(errorHandler);

export default app;
