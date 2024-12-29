import { Router } from "express";
import db from "../db";
import user from "../db/schema/user";

const router = Router();

router.get("/", async (req, res) => {
  const users = await db.select().from(user);
  res.json({ users });
});

export default router;
