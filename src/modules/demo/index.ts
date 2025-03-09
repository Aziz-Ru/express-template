import { Request, Response } from "express";
import { Controller, Get } from "../../decorator";

@Controller("/demo")
export class DemoController {
  @Get("/k")
  async index(req: Request, res: Response) {
    return res.json({ message: "Hello World" });
  }
}
