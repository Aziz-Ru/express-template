import { Router } from "express";
import validate from "../../middlewares/validate";
import * as userController from "./user.controller";
import * as userValidation from "./user.validation";

const router = Router();

router
  .route("/")
  .get(userController.getUsers)
  .post(validate(userValidation.createUser), userController.createUser);

export default router;
