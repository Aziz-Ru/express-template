import { Router } from "express";
import { z } from "zod";
import { userController } from "../controllers";
import validate from "../middlewares/validate";
import { userValidation } from "../validation";

const router = Router();

const user = z.object({
  name: z.string().nonempty(),
});
const res = user.safeParse({ name: "" });
res.error?.errors.map((error) => {
  error.path;
});
router
  .route("/")
  .get(userController.getUsers)
  .post(validate(userValidation.createUser), userController.createUser);

export default router;
