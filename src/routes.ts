import { Router } from "express";
import fs from "fs";
import path from "path";
const router = Router();

const registerRoutes = async () => {
  try {
    const modulesPath = path.join(__dirname, "modules");
    const modules = fs.readdirSync(modulesPath);

    for (const module of modules) {
      try {
        const moduleRoutesPath = path.join(modulesPath, module, `routes.ts`);
        console.log(moduleRoutesPath);
        if (fs.existsSync(moduleRoutesPath)) {
          const routeModuleUrl = `file://${moduleRoutesPath}`;
          const routeModule = await import(routeModuleUrl);
          const route = routeModule.default;
          router.use(`/${module}`, route);
          console.log(`✅ ${module} routes registered`);
        } else {
          throw new Error(`❎ Failed to load route from ${module}`);
        }
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

registerRoutes();
export default router;
