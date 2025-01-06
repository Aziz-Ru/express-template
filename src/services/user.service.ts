import db from "../db";
import user from "../db/schema/user";

export const getUsers = async () => {
  return await db.select().from(user);
};
