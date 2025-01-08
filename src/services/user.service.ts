import db from "../db";
import user from "../db/schema/user";
import ApiError from "../utils/ApiError";

export const getUsers = async () => {
  return await db.select().from(user);
};

export const createUser = async (email: string, password: string) => {
  throw new ApiError(400, "Invalid password");
};
