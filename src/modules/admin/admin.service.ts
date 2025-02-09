import { eq } from "drizzle-orm";
import { Request } from "express";
import db from "../../db";
import { adminTable } from "../../db/schema/admin";

export const addAdmin = async (req: Request) => {
  await db.insert(adminTable).values({
    username: req.body.email,
    password: req.body.password,
  });
};

export const getAdminByUsername = async (req: Request) => {
  await db.query.adminTable.findFirst({
    where: eq(adminTable.username, req.body.username),
  });
};
