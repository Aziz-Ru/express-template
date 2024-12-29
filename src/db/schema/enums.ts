import { pgEnum } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["MALE", "FEMALE"]);

export const platformEnum = pgEnum("platform", ["WEB", "ANDROID", "IOS"]);
