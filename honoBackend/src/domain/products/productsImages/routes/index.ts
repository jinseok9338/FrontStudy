import { createRoute, z } from "@hono/zod-openapi";
import {
  ProductImageListResponseSchema,
  updateImageCreateSchema,
} from "../models/dto";
import { ParamSchema } from "../../../todos/models/dtoShema";

export const updateProductImageRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateImageCreateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Create product images",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
    },
  },
});

export const listAllProductImagesRoute = createRoute({
  method: "get",
  path: "/{productId}",
  request: ParamSchema,
  responses: {
    200: {
      description: "List all product images",
      content: {
        "application/json": {
          schema: ProductImageListResponseSchema.openapi(
            "ProductImageListResponseSchema"
          ),
        },
      },
    },
    500: {
      description: "Internal server error",
    },
  },
});

export const deleteProductImageRoute = createRoute({
  method: "delete",
  path: "/{productId}",
  request: ParamSchema,
  responses: {
    200: {
      description: "delete",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
    },
  },
});
