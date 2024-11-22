import {
  serial,
  text,
  boolean,
  timestamp,
  pgTable,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { companies, companySchema } from "../../companies/models/schema";
import { z } from "zod";
import { Authes, Roles } from "../../../const/enums";

export const UserRoles = pgEnum("user_roles", Roles);
export const AuthLevels = pgEnum("auth_levels", Authes);

export const users = pgTable("users", {
  // Primary key
  userId: serial("user_id").primaryKey(),

  // Foreign key to company
  companyId: integer("company_id").references(() => companies.companyId),

  // User fields
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  zipCode: text("zip_code"),
  empNo: text("emp_no"),
  password: text("password").notNull(),
  role: UserRoles("role").default("USER"),
  auth: AuthLevels("auth").default("READ"),
  tempPassword: text("temp_password"),
  address: text("address"),
  detailAddress: text("detail_address"),

  // Audit fields
  deleted: boolean("deleted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: integer("created_by"),
  deletedAt: timestamp("deleted_at"),
  deletedBy: integer("deleted_by"),
  lastModifiedBy: integer("last_modified_by"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  isBlocked: boolean("is_blocked").default(false),
});

export const User = users.$inferSelect;
export type UserType = typeof User;
export const CreateUser = users.$inferInsert;

export const companiesRelations = relations(companies, ({ many }) => ({
  users: many(users),
}));

export const usersRelations = relations(users, ({ one }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.companyId],
  }),
}));

export const UserSchema = z.object({
  userId: z.number().int().positive(),
  companyId: z.number().int().positive(),
  name: z.string().min(1, "User name is required"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "User email is required"),
  phone: z.string().nullable(),
  role: z.enum(Roles),
  auth: z.enum(Authes),
  zipCode: z.string().nullable(),
  empNo: z.string(),
  address: z.string().nullable(),
  detailAddress: z.string().nullable(),

  // Audit fields
  deleted: z.boolean(),
  createdAt: z.date(),
  createdBy: z.number().int().nullable(),
  deletedAt: z.date().nullable(),
  deletedBy: z.number().int().nullable(),
  lastModifiedBy: z.number().int().nullable(),
  updatedAt: z.date(),
  isBlocked: z.boolean(),
});

export const UserResponseSchema = UserSchema.extend({
  company: companySchema,
});

export const CreateUserSchema = z.object({
  companyId: z.number().int().positive(),
  name: z.string().min(1, "User name is required"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "User email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  role: z.enum(Roles),
  auth: z.enum(Authes),
  empNo: z.string(),
  zipCode: z.string().optional(),
  address: z.string().optional(),
  detailAddress: z.string().optional(),
});
