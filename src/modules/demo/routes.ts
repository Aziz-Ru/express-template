import { NextFunction, Request, Response } from "express";
import { Controller, Get } from "../../decorator";

@Controller("/demo")
class DemoController {
  @Get("/", (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware 2");
    next();
  })
  async index(req: Request, res: Response) {
    // throw new Error("Hello World");
    return res.json({ message: "Hello World" });
  }
}


export default (DemoController as any).router;
