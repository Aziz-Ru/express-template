import { defineConfig } from "drizzle-kit";
import { dbUrl } from "./src/config/index";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl!,
  },
  verbose: true,
  strict: true,
});
