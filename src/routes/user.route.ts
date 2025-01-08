import { Router } from "express";
import { userController } from "../controllers";
import validate from "../middlewares/validate";
import { userValidation } from "../validation";

const router = Router();

router
  .route("/")
  .get(userController.getUsers)
  .post(validate(userValidation.createUser), userController.createUser);

  
export default router;
