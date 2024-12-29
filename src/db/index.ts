import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { dbUrl } from "../config/index";

const connection = postgres(dbUrl!);

const db = drizzle(connection, { logger: true });

export default db;
