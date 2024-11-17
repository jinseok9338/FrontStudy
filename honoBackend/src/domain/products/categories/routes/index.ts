import { createRoute, z } from "@hono/zod-openapi";
import {
  CategoryMenuResponseSchema,
  CategoryQuerySchema,
  CategoryResponseSchema,
  CategorySchema,
} from "../../models/dto";

export const getCategoriesRoute = createRoute({
  method: "get",
  path: "/search",
  description: "get categories by the category depth",
  tags: ["Categories"],
  security: [
    {
      bearerAuth: [],
    },
  ],
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

export const getCategoriesMenuRoute = createRoute({
  method: "get",
  security: [
    {
      bearerAuth: [],
    },
  ],
  path: "/menus",
  description: "get categories by the category depth",
  tags: ["Categories"],
  responses: {
    "200": {
      description: "Categories fetched successfully",
      content: {
        "application/json": {
          schema: CategoryMenuResponseSchema.openapi(
            "CategoryMenuResponseSchema"
          ),
        },
      },
    },
    "500": {
      description: "Internal server error",
    },
  },
});
