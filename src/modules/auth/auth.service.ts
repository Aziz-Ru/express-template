import bcrypt from "bcryptjs";
import { Request } from "express";
import status from "http-status";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import ApiError from "../../utils/ApiError";
import { createUser, getUserByEmail } from "../user/user.service";

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

  const token = jwt.sign(
    {
      uid: existingUser.uid,
      date: new Date(),
    },
    env.JWT_SECRET_KEY
  );
  return token;
};

export const register = async (req: Request) => {
  const existingUser = await getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(status.BAD_REQUEST, "This Email Already Exist");
  }
  await createUser(req);
};
