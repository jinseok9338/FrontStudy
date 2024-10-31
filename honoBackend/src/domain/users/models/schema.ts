import {
  serial,
  text,
  boolean,
  timestamp,
  pgTable,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { companies } from "../../companies/models/schema";

export const users = pgTable("users", {
  // Primary key
  userId: serial("user_id").primaryKey(),

  // Foreign key to company
  companyId: integer("company_id").references(() => companies.companyId),

  // User fields
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: text("role"),
  zipCode: text("zip_code"),
  empNo: text("emp_no"),
  password: text("password"),
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
});

export const companiesRelations = relations(companies, ({ many }) => ({
  users: many(users),
}));

export const usersRelations = relations(users, ({ one }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.companyId],
  }),
}));
