import { eq } from "drizzle-orm";
import { Request } from "express";
import db from "../../db";
import { userSchema, userView } from "../../db/schema/userSchema";

export const getUsers = async () => {
  return await db.select().from(userView);
};

export const createUser = async (req: Request) => {
  const userBody = req.body;
};

export const getUserByEmail = async (email: string) => {
  const existingUser = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email));

  return existingUser[0];
};
