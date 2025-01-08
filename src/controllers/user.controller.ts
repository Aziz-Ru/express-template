import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "../services";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  throw new ApiError(httpStatus.BAD_REQUEST, "Invalid password");
});

export const createUser = catchAsync(async (req: Request, res: Response) => {
  await userService.createUser(req.body.email, req.body.password);
  res.send("User created successfully");
});
