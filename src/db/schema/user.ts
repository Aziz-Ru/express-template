import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { genderEnum, platformEnum } from "./enums";

const user = pgTable("users", {
  uid: varchar("uid", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 11 }).notNull(),
  phoneVerified: boolean("phone_verified").default(false),
  emailVerified: boolean("email_verified").default(false),
  confirmationCode: varchar("confirmation_code", { length: 255 }).notNull(),
  confirmationCodeSentAt: timestamp("confirmation_code_sent_at"),
  confirmedAt: timestamp("confirmed_at"),
  isActivated: boolean("is_activated").default(false),
  deviceId: varchar("device_id", { length: 255 }).notNull(),
  photoUrl: varchar("photo_url", { length: 900 }),
  gender: genderEnum().default("MALE"),
  platform: platformEnum().default("WEB"),
  lastSignedInAt: timestamp("last_signed_in_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export default user;
