import {
  serial,
  text,
  boolean,
  timestamp,
  pgTable,
  varchar,
  integer,
  doublePrecision,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { companies } from "../../companies/models/schema";

// Category table

export const categories = pgTable(
  "categories",
  {
    categoryId: serial("category_id").primaryKey(),
    name: text("name").notNull(),
    depth: integer("depth"),
    priority: integer("priority"),
    parentId: integer("parent_id"), // Remove the direct reference here
    companyId: integer("company_id").references(() => companies.companyId),

    // Audit fields
    deleted: boolean("deleted").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    createdBy: integer("created_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: integer("deleted_by"),
    lastModifiedBy: integer("last_modified_by"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      // Add the self-reference as a constraint
      parentIdFk: sql`foreign key ("parent_id") references "categories" ("category_id")`,
    };
  }
);
// Product table
export const products = pgTable("products", {
  productId: serial("product_id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  sku: text("sku"),
  barcode: text("barcode"),
  code: text("code"),
  price: doublePrecision("price"),
  discountRate: doublePrecision("discount_rate"),
  quantity: integer("quantity"),
  stock: integer("stock"),
  size: text("size"),
  colorCode: text("color_code"),
  displayYn: text("display_yn"),
  // categories should be array of category ids
  categories: integer("categories").array(),
  companyId: integer("company_id").references(() => companies.companyId),

  // Audit fields
  deleted: boolean("deleted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: integer("created_by"),
  deletedAt: timestamp("deleted_at"),
  deletedBy: integer("deleted_by"),
  lastModifiedBy: integer("last_modified_by"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Product Image table
export const productImages = pgTable("product_images", {
  productImageId: serial("product_image_id").primaryKey(),
  productId: integer("product_id").references(() => products.productId),
  fileName: text("file_name"),
  filePath: text("file_path"),
  fileType: text("file_type"),
  fileSize: integer("file_size"),
  extension: text("extension"),
  oriFileName: text("ori_file_name"),

  // Audit fields
  deleted: boolean("deleted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: integer("created_by"),
  deletedAt: timestamp("deleted_at"),
  deletedBy: integer("deleted_by"),
  lastModifiedBy: integer("last_modified_by"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Tag table
export const tags = pgTable("tags", {
  tagId: serial("tag_id").primaryKey(),
  name: text("name").notNull(),

  // Audit fields
  deleted: boolean("deleted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: integer("created_by"),
  deletedAt: timestamp("deleted_at"),
  deletedBy: integer("deleted_by"),
  lastModifiedBy: integer("last_modified_by"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Product Tag junction table
export const productTags = pgTable("product_tags", {
  productTagId: serial("product_tag_id").primaryKey(),
  productId: integer("product_id").references(() => products.productId),
  tagId: integer("tag_id").references(() => tags.tagId),

  // Audit fields
  deleted: boolean("deleted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: integer("created_by"),
  deletedAt: timestamp("deleted_at"),
  deletedBy: integer("deleted_by"),
  lastModifiedBy: integer("last_modified_by"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Quota table
export const quotas = pgTable("quotas", {
  quotaId: serial("quota_id").primaryKey(),
  count: integer("count"),
  categoryId: integer("category_id").references(() => categories.categoryId),
  eventConfigId: integer("event_config_id"),
  userTypeId: integer("user_type_id"),

  // Audit fields
  deleted: boolean("deleted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: integer("created_by"),
  deletedAt: timestamp("deleted_at"),
  deletedBy: integer("deleted_by"),
  lastModifiedBy: integer("last_modified_by"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Relations
export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.categoryId],
  }),
  children: many(categories, {
    relationName: "categories",
  }),
  company: one(companies, {
    fields: [categories.companyId],
    references: [companies.companyId],
  }),
}));

export const productImageRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.productId],
  }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  company: one(companies, {
    fields: [products.companyId],
    references: [companies.companyId],
  }),
  images: many(productImages),
  productTags: many(productTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  productTags: many(productTags),
}));

export const productTagsRelations = relations(productTags, ({ one }) => ({
  product: one(products, {
    fields: [productTags.productId],
    references: [products.productId],
  }),
  tag: one(tags, {
    fields: [productTags.tagId],
    references: [tags.tagId],
  }),
}));

export const quotasRelations = relations(quotas, ({ one }) => ({
  category: one(categories, {
    fields: [quotas.categoryId],
    references: [categories.categoryId],
  }),
}));
