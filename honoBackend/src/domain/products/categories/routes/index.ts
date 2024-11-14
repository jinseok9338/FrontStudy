import { createRoute, z } from "@hono/zod-openapi";
import {
  CategoryQuerySchema,
  CategoryResponseSchema,
  CategorySchema,
} from "../../models/dto";

export const getCategoriesRoute = createRoute({
  method: "get",
  path: "/",
  description: "get categories by the category depth",
  tags: ["Categories"],
  request: CategoryQuerySchema,
  responses: {
    "200": {
      description: "Categories fetched successfully",
      content: {
        "application/json": {
          schema: CategoryResponseSchema.openapi("GetCategoriesResponseSchema"),
        },
      },
    },
    "500": {
      description: "Internal server error",
    },
  },
});
