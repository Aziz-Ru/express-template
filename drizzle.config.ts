import { defineConfig } from "drizzle-kit";
import { dbUrl } from "./src/config";

export default defineConfig({
  out: "./src/db/drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: dbUrl!,
  },
});
