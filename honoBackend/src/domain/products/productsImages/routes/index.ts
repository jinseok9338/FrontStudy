import { createRoute } from "@hono/zod-openapi";
import {
  updateImageCreateSchema,
  ProductImageSchema,
  ProductImageListResponseSchema,
} from "../models/dto";

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
