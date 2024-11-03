import {
  serial,
  text,
  boolean,
  timestamp,
  pgTable,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const companies = pgTable("companies", {
  // Primary key
  companyId: serial("company_id").primaryKey(),

  // Base fields
  name: text("name").notNull(),
  code: text("code"),
  phone: text("phone"),
  email: text("email"),
  zipCode: text("zip_code"),
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
});

export const companySchema = z.object({
  companyId: z.number().int().positive(),
  name: z.string().min(1, "Company name is required"),
  code: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().email("Invalid email format").nullable(),
  zipCode: z.string().nullable(),
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
});

export const createCompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  code: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email format"),
  zipCode: z.string().optional(),
  address: z.string().optional(),
  detailAddress: z.string().optional(),
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = typeof companies.$inferInsert;

export const companyIdSchema = z.object({
  id: z.string().refine((val) => parseInt(val)),
});
