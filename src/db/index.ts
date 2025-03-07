import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, PoolClient } from "pg";
import env from "../config/env";
import * as schema from "./schema";

type DrizzleDB = ReturnType<typeof drizzle<typeof schema>>;

class Database {
  private pool: Pool;
  private db: DrizzleDB;
  constructor() {
    this.pool = new Pool({
      connectionString: env.DB_URL,
    });
    this.db = drizzle({ client: this.pool, schema: schema });
    this.connect();
  }

  private async connect() {
    try {
      const client = await this.pool.connect();
      client.release();
      console.log("✅ Connected to database");
    } catch (error) {
      console.error("❌ Failed to connect to database");
      console.error(error);
      process.exit(1);
    }
  }
  // Get the database connection.
  public getDB(): DrizzleDB {
    return this.db;
  }

  // Execute raw query (optional)
  // public async query<T>(text: string, params?: any[]): Promise<QueryResult<T>> {
  //   try {
  //     return await this.pool.query<T>(text, params);
  //   } catch (error) {
  //     throw new Error(
  //       `Query failed: ${
  //         error instanceof Error ? error.message : "Unknown error"
  //       }`
  //     );
  //   }
  // }

  // Get a client for transactions (if needed)
  public async getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }

  // Close the database connection.
  public async close() {
    await this.pool.end();
    console.log("✅ Database connection closed");
  }
}

const db = new Database();
export default db;
