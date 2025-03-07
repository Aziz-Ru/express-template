import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "process";
import { limitter } from "../config";

export function configureMiddleware(app: Express) {
  // parsing incoming requests with JSON payload.
  app.use(express.json());
  // parsing incoming requests with urlencoded payload.
  app.use(express.urlencoded({ extended: true }));

  // logging incoming requests.
  app.use(morgan("dev"));
  // compressing responses.
  app.use(compression());
  // securing the app by setting various HTTP headers.
  app.use(helmet());

  app.use(cookieParser(env.JWT_SECRET_KEY));
  // enabling cors.
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  // disabling the powered-by header.
  app.disable("x-powered-by");
  // disabling the etag header.
  app.disable("etag");
  // serving static files.
  app.use(limitter);
}
