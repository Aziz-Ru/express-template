import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.route("/").get(userController.getUsers);

export default router;
