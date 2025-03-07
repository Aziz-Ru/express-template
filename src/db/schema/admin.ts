import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const adminTable = pgTable("admin", {
  id: uuid("uuid").defaultRandom().primaryKey(),
  username: varchar("username", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const roleTable = pgTable("role", {
  name: varchar("name", { length: 10 }).primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const adminRoleTable = pgTable("admin_role", {
  adminId: uuid("admin_id").references(() => adminTable.id),
  roleName: varchar("role_name", { length: 10 }).references(
    () => roleTable.name
  ),
  createdAt: timestamp("created_at").defaultNow(),
});

export const permissionTable = pgTable("permission", {
  name: varchar("name", { length: 10 }).primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rolePermissionTable = pgTable("role_permission", {
  roleName: varchar("role_name", { length: 10 }).references(
    () => roleTable.name
  ),
  permissionName: varchar("permission_name", { length: 10 }).references(
    () => permissionTable.name
  ),
  createdAt: timestamp("created_at").defaultNow(),
});
