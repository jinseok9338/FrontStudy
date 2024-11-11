import { z } from "zod";
import { UserResponseSchema } from "../../users/models/schema";
import { categories } from "./schema";

export const ProductImageSchema = z.object({
  productImageId: z.number(),
  productId: z.number(),
  fileName: z.string(),
  filePath: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
  extension: z.string(),
  oriFileName: z.string(),
  deleted: z.boolean(),
  createdAt: z.date().optional().nullable(),
  createdBy: z.number().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  deletedBy: z.number().optional().nullable(),
  lastModifiedBy: z.number().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
});

export const CategorySchema = z.object({
  categoryId: z.number(),
  name: z.string(),
  depth: z.number(),
  priority: z.number(),
  parentId: z.number(),
  companyId: z.number(),
  deleted: z.boolean(),
  createdAt: z.date().optional().nullable(),
  createdBy: z.number().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  deletedBy: z.number().optional().nullable(),
  lastModifiedBy: z.number().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
});

export const ProductSchema = z.object({
  productId: z.number(),
  name: z.string(),
  description: z.string(),
  sku: z.string(),
  barcode: z.string(),
  code: z.string(),
  price: z.number(),
  discountRate: z.number(),
  quantity: z.number(),
  stock: z.number(),
  size: z.string(),
  colorCode: z.string(),
  displayYn: z.string(),
  categories: z.array(CategorySchema),
  companyId: z.number(),
  deleted: z.boolean(),
  createdAt: z.date().optional().nullable(),
  createdBy: z.number().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  deletedBy: z.number().optional().nullable(),
  lastModifiedBy: z.number().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  images: z.array(ProductImageSchema),
});

export const ProductWithoutImagesSchema = z.object({
  productId: z.number(),
  name: z.string(),
  description: z.string(),
  sku: z.string(),
  barcode: z.string(),
  code: z.string(),
  price: z.number(),
  discountRate: z.number(),
  quantity: z.number(),
  stock: z.number(),
  size: z.string(),
  colorCode: z.string(),
  displayYn: z.string(),
  categories: z.array(CategorySchema),
  companyId: z.number(),
  deleted: z.boolean(),
  createdAt: z.date().optional().nullable(),
  createdBy: z.number().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  deletedBy: z.number().optional().nullable(),
  lastModifiedBy: z.number().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
});

export const InsertProductRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  sku: z.string(),
  barcode: z.string(),
  code: z.string(),
  price: z.number(),
  discountRate: z.number(),
  quantity: z.number(),
  stock: z.number(),
  size: z.string(),
  colorCode: z.string(),
  displayYn: z.string(),
  categories: z.array(z.number()),
  companyId: z.number(),
});

export const GetProductsWithPaginationResponseSchema = {
  200: {
    description: "Fetch paginated list of Products",
    content: {
      "application/json": {
        schema: z
          .object({
            products: z.array(ProductSchema),
            total: z.number(),
            hasMore: z.boolean(),
            page: z.number(),
            size: z.number(),
          })
          .openapi("GetProductsWithPaginationResponseSchema"),
      },
    },
  },
};
