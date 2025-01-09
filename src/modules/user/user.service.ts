import { eq } from "drizzle-orm";
import { Request } from "express";
import db from "../../db";
import user from "../../db/schema/user";

export const getUsers = async () => {
  return await db.select().from(user);
};

export const createUser = async (req: Request) => {
  const userBody = req.body;
  
  return await db.insert(user).values({
    uid: "123456",
    email: userBody.email,
    password: userBody.password,
    phoneNumber: userBody.phoneNumber,
    confirmationCode: "123456",
    deviceId: "123456",
    confirmationCodeSentAt: new Date(),
    confirmedAt: new Date(),
    photoUrl: "https://example.com/photo.jpg",
    gender: userBody.gender,
    platform: userBody.platform,
    lastSignedInAt: new Date(),
  });
};

export const getUserByEmail = async (email: string) => {
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, email));

  return existingUser[0];
};
