import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "../config/env";

const connection = postgres(env.DB_URL);

const db = drizzle(connection, { logger: false });

export default db;
