import { eq } from "drizzle-orm";
import { Request, Response, Router } from "express";
import db from "../db";
import user from "../db/schema/user";

const router = Router();

router.get("/", async (req, res) => {
  const users = await db.select().from(user);
  res.json({ users });
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const users = await db.select().from(user).where(eq(user.uid, id));
  res.json({ users });
});

export default router;
