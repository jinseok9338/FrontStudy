import {
  serial,
  text,
  boolean,
  timestamp,
  pgTable,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

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
