import { Router } from "express";
import "reflect-metadata";
import { DemoController } from "./modules/demo";
const router = Router();

// Register routes

const controllers = [DemoController];

controllers.forEach((controller) => {
  router.use((controller as any).router);
});

export default router;

// FIle based

// const registerRoutes = async () => {
//   try {
//     const modulesPath = path.join(__dirname, "modules");
//     const modules = fs
//       .readdirSync(modulesPath, { withFileTypes: true })
//       .filter((dirent) => dirent.isDirectory())
//       .map((dirent) => dirent.name);

//     for (const module of modules) {
//       try {
//         const moduleRoutesPath = path.join(modulesPath, module, `routes.ts`);
//         console.log(moduleRoutesPath);
//         if (fs.existsSync(moduleRoutesPath)) {
//           const routeModuleUrl = `file://${moduleRoutesPath}`;
//           const routeModule = await import(routeModuleUrl);
//           const route = routeModule.default;

//           router.use(`/${module}`, route);

//           console.log(`✅ ${module} routes registered`);
//         } else {
//           console.error(`❌ No route.ts found in  ${module}`);
//         }
//       } catch (error) {
//         console.error(`❌ Failed to load route for ${module}`);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };
