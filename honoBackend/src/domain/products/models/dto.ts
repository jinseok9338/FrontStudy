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
  depth: z.number().nullable(),
  priority: z.number().nullable(),
  parentId: z.number().nullable(),
  companyId: z.number().nullable(),
  deleted: z.boolean(),
  createdAt: z.date().optional().nullable(),
  createdBy: z.number().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  deletedBy: z.number().optional().nullable(),
  lastModifiedBy: z.number().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
});

type Category = z.infer<typeof CategorySchema> & {
  children: Category[];
};

// this is CategorySchema with children property
export const CategoryWithChildrenSchema: z.ZodType<Category> =
  CategorySchema.extend({
    children: z.lazy(() => CategoryWithChildrenSchema.array()),
  }).openapi("CategoryWithChildrenSchema", {
    type: "object",
    default: {
      categoryId: 1,
      name: "Category",
      depth: 0,
      priority: 0,
      parentId: null,
      companyId: 1,
      deleted: false,
      createdAt: new Date(),
      createdBy: 1,
      deletedAt: null,
      deletedBy: null,
      lastModifiedBy: 1,
      updatedAt: new Date(),
      children: [
        {
          categoryId: 2,
          name: "Sub Category",
          depth: 1,
          priority: 0,
          parentId: 1,
          companyId: 1,
          deleted: false,
          createdAt: new Date(),
          createdBy: 1,
          deletedAt: null,
          deletedBy: null,
          lastModifiedBy: 1,
          updatedAt: new Date(),
          children: [],
        },
      ],
    },
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

export const ProductQuerySchema = {
  query: z.object({
    size: z.string().optional().default("10"),
    page: z.string().optional().default("0"),
    name: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    colorCode: z.string().optional(),
    categoryOne: z.string().optional(),
    categoryTwo: z.string().optional(),
    categoryThree: z.string().optional(),
  }),
};

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

export const CategoryQuerySchema = {
  query: z.object({
    depthOne: z.string().optional(),
    depthTwo: z.string().optional(),
  }),
};

export type CategoryRequestType = z.infer<
  (typeof CategoryQuerySchema)["query"]
>;

export const CategoryResponseSchema = z.object({
  depthOne: z.array(CategorySchema),
  depthTwo: z.array(CategorySchema),
  depthThree: z.array(CategorySchema),
});

export const CategoryMenuResponseSchema = z.object({
  categoryMenu: z.array(CategoryWithChildrenSchema),
});

export const GetCategoriesResponseSchema = {
  200: {
    description: "Fetch list of Categories",
    content: {
      "application/json": {
        schema: CategoryResponseSchema.openapi("GetCategoriesResponseSchema"),
      },
    },
  },
};
