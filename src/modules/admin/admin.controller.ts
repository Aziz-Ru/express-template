import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

export const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({ data: [] });
});

export const getAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({ data: [] });
});

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(201).json({
    code: 201,
    message: "Admin created successfully",
  });
});

export const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({
    code: 200,
    message: "Admin updated successfully",
  });
});

export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({
    code: 200,
    message: "Admin deleted successfully",
  });
});
