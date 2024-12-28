import compression from "compression";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./api";
import { dbUrl, jwtSecretKey, port, prefix } from "./config";
import limitter from "./config/rate-limitter";

// create an express app.
const app = express();

// process.on("uncaughtException", (err) => {
//   console.log(err);
//   process.exit(1);
// });

// handle unhandled promise rejections.
// process.on("unhandledRejection", (err) => {

// });
// check if jwtSecretKey is defined.
if (!jwtSecretKey) {
  console.error("FATAL ERROR: jwtSecretKey is not defined.");
}
if (!dbUrl) {
  console.error("FATAL ERROR: dbUrl is not defined.");
}

// Middlewares
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
// disabling the powered-by header.
app.disable("x-powered-by");
// disabling the etag header.
app.disable("etag");
// serving static files.
app.use(express.static("public"));

app.use(limitter);

// Routes
app.use(prefix, routes);

// 404 route.
app.use((req, res, next) => {
  const error = new Error("Url is not found");
  (error as any).status = 404;
  error.name = "Not Found";
  next(error);
});

// Error handling middleware.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  //   console.error(err);
  res
    .status(err.status || 500)
    .json({ errors: [{ name: err.name, msg: err.message }] });
});

// start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
