import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  throw new ApiError(httpStatus.BAD_REQUEST, "Invalid password");
});
