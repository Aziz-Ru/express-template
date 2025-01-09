import { Router } from "express";
import userRoute from "./modules/user/user.route";


const router = Router();

const routes = [
  {
    path: "/users",
    route: userRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;