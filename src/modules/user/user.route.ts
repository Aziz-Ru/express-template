import { Router } from "express";
import validate from "../../middlewares/validate";
import * as userController from "./user.controller";
import * as userValidation from "./user.validation";

const router = Router();

router
  .route("/")
  .get(userController.getUsers)
  .post(validate(userValidation.createUser), userController.createUser);

router
  .route("/:userId")
  .get(validate(userValidation.getUser), userController.getUser)
  .put(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.getUser), userController.deleteUser);
export default router;
