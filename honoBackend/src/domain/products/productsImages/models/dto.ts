import { z } from "zod";

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
  order: z.number(),
});

export const ProductImageListResponseSchema = z
  .object({
    images: z.array(ProductImageSchema),
  })
  .openapi("ProductImageListResponseSchema");

export const updateImageCreateSchema = z
  .object({
    images: z.array(
      z.object({
        productId: z.number(),
        filePath: z.string(),
        order: z.number(),
      })
    ),
  })
  .openapi("ProductImageCreateSchema");

export const DeleteImageRequestSchema = z
  .object({
    filePath: z.string(),
    productImageId: z.number(),
  })
  .openapi("DeleteImageRequestSchema");
