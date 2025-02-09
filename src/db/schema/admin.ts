import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const adminTable = pgTable("admin", {
  id: uuid("uuid").defaultRandom().primaryKey(),
  username: varchar("username", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
});

export const roleTable = pgTable("role", {
  name: varchar("name", { length: 10 }).primaryKey(),
  created_at: timestamp("created_at").defaultNow(),
});

export const adminRoleTable = pgTable("admin_role", {
  admin_id: uuid("admin_id").references(() => adminTable.id),
  role_name: varchar("role_name", { length: 10 }).references(
    () => roleTable.name
  ),
  created_at: timestamp("created_at").defaultNow(),
});
