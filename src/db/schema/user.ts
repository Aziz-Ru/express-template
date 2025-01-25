import {
  boolean,
  pgTable,
  pgView,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { genderEnum, platformEnum } from "./enums";



export const userSchema = pgTable("users", {
  uid: varchar("uid", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").default(false),
  confirmationCode: varchar("confirmation_code", { length: 255 }).notNull(),
  confirmationCodeSentAt: timestamp("confirmation_code_sent_at", {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  confirmedAt: timestamp("confirmed_at", { precision: 6, withTimezone: true }),
  isActivated: boolean("is_activated").default(false),
  deviceId: varchar("device_id", { length: 255 }).notNull(),
  photoUrl: varchar("photo_url", { length: 900 }),
  gender: genderEnum().default("MALE"),
  platform: platformEnum().default("WEB"),
  lastSignedInAt: timestamp("last_signed_in_at"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const userView = pgView("user_view").as((qb) =>
  qb
    .select({
      uid: userSchema.uid,
      email: userSchema.email,
      emailVerified: userSchema.emailVerified,
      gender: userSchema.gender,
      photoUrl: userSchema.photoUrl,
      createdAt: userSchema.createdAt,
    })
    .from(userSchema)
);
