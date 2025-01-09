import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";
import catchAsync from "../../utils/catchAsync";
import * as userService from "./user.service";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  throw new ApiError(httpStatus.BAD_REQUEST, "Invalid password");
});

export const createUser = catchAsync(async (req: Request, res: Response) => {
  
  if (await userService.getUserByEmail(req.body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
  }
  await userService.createUser(req);
  res.send("User created successfully");
});
