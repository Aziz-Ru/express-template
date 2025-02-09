import { Router } from "express";
import authRoute from "./modules/auth/auth.route";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
];


routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
