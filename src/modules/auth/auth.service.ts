import bcrypt from "bcryptjs";
import { Request } from "express";
import status from "http-status";
import ApiError from "../../utils/ApiError";
import { getUserByEmail } from "../user/user.service";

export const login = async (req: Request) => {
  const { email, password } = req.body;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    throw new ApiError(status.BAD_REQUEST, "Invalid User");
  }
  const checkPassword = await bcrypt.compare(password, existingUser.password);
  if (!checkPassword) {
    throw new ApiError(status.BAD_REQUEST, "Invalid User");
  }
  
};
