import { Request, Response } from "express";
import * as AuthService from "./auth.service";
export const login = async (req: Request, res: Response) => {
  await AuthService.login(req);
    
  res
  res.status(200).json({
    code: 200,
    message: "User successfully login",
  });
};
