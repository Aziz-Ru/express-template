import { NextFunction, Request, Response, Router } from "express";
import "reflect-metadata";

export const ROUTE_METADATA = Symbol("route_metadata");

interface RouteConfig {
  path: string;
  method: "get" | "post" | "put" | "delete";
  middleware: ((req: Request, res: Response, next: NextFunction) => void)[];
  handlerName: string;
}

const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export function Get(
  path: string,
  ...middleware: ((req: Request, res: Response, next: NextFunction) => void)[]
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const routes: RouteConfig[] =
      Reflect.getMetadata(ROUTE_METADATA, target.constructor) || [];

    routes.push({
      path,
      method: "get",
      middleware,
      handlerName: propertyKey,
    });
    Reflect.defineMetadata(ROUTE_METADATA, routes, target.constructor);
  };
}

export function Post(
  path: string,
  ...middleware: ((req: Request, res: Response, next: NextFunction) => void)[]
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const routes: RouteConfig[] =
      Reflect.getMetadata(ROUTE_METADATA, target.constructor) || [];
    routes.push({
      path,
      method: "post",
      middleware,
      handlerName: propertyKey,
    });
    Reflect.defineMetadata(ROUTE_METADATA, routes, target.constructor);
  };
}

export function Put(
  path: string,
  ...middleware: ((req: Request, res: Response, next: NextFunction) => void)[]
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const routes: RouteConfig[] =
      Reflect.getMetadata(ROUTE_METADATA, target.constructor) || [];
    routes.push({
      path,
      method: "put",
      middleware,
      handlerName: propertyKey,
    });
    Reflect.defineMetadata(ROUTE_METADATA, routes, target.constructor);
  };
}

export function Delete(
  path: string,
  ...middleware: ((req: Request, res: Response, next: NextFunction) => void)[]
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const routes: RouteConfig[] =
      Reflect.getMetadata(ROUTE_METADATA, target.constructor) || [];
    routes.push({
      path,
      method: "delete",
      middleware,
      handlerName: propertyKey,
    });
    Reflect.defineMetadata(ROUTE_METADATA, routes, target.constructor);
  };
}

export function Controller(prefix: string = "") {
  
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const router = Router();
    const routes: RouteConfig[] =
      Reflect.getMetadata(ROUTE_METADATA, constructor) || [];

    const instance = new constructor();

    routes.forEach(({ path, method, middleware, handlerName }) => {
      const fullPath = `${prefix}${path}`;
      const handler = (instance as any)[handlerName].bind(instance);
      (router as any)[method](fullPath, ...middleware, catchAsync(handler));
    });

    (constructor as any).router = router;
  };
}

export function getRouter(controller: any): Router {
  return controller.router;
}
