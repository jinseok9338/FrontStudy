import { createRoute, z } from "@hono/zod-openapi";
import { ParamSchema, QuerySchema } from "../../todos/models/dtoShema";
import {
  GetProductsWithPaginationResponseSchema,
  InsertProductRequestSchema,
  ProductQuerySchema,
  ProductSchema,
  ProductWithoutImagesSchema,
} from "../models/dto";

export const getAdminProductsWithPagination = createRoute({
  method: "get",
  path: "/admin",
  tags: ["Products"],
  request: ProductQuerySchema,
  responses: {
    ...GetProductsWithPaginationResponseSchema,
    401: { description: "Unauthorized" },
  },
});

export const getUserProductsWithPagination = createRoute({
  method: "get",
  path: "/user",
  tags: ["Products"],
  request: ProductQuerySchema,
  responses: {
    ...GetProductsWithPaginationResponseSchema,
    401: { description: "Unauthorized" },
  },
});

export const createProductRoute = createRoute({
  method: "post",
  description: "Product Creation",
  path: "/",
  tags: ["Products"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: InsertProductRequestSchema.openapi(
            "InsertProductRequestSchema"
          ),
        },
      },
    },
  },
  responses: {
    "201": {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: ProductWithoutImagesSchema.openapi(
            "ProductWithoutImagesSchema"
          ),
        },
      },
    },
    "400": {
      description: "Invalid input data",
    },
    "409": {
      description: "Same product with this sku already exists",
    },
    "500": {
      description: "Internal server error",
    },
  },
});

export const deleteProductRoute = createRoute({
  method: "delete",
  path: "/{id}",
  description: "Product Deletion",
  tags: ["Products"],
  request: ParamSchema,
  responses: {
    "200": {
      description: "Product deleted successfully",
    },
    "404": {
      description: "Product not found",
    },
    "500": {
      description: "Internal server error",
    },
  },
});

export const getProductByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  description: "Product Fetch",
  tags: ["Products"],
  request: ParamSchema,
  responses: {
    "200": {
      description: "Product fetched successfully",
      content: {
        "application/json": {
          schema: ProductSchema.openapi("ProductSchema"),
        },
      },
    },
    "404": {
      description: "Product not found",
    },
    "500": {
      description: "Internal server error",
    },
  },
});

export const updateProductRoute = createRoute({
  method: "put",
  path: "/{id}",
  description: "Product Update",
  tags: ["Products"],
  request: {
    params: z.object({
      id: z.string().openapi({
        param: { name: "id", in: "path" },
        type: "integer",
        example: "1",
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: InsertProductRequestSchema.openapi(
            "InsertProductRequestSchema"
          ),
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Product updated successfully",
      content: {
        "application/json": {
          schema: ProductSchema.openapi("ProductSchema"),
        },
      },
    },
    "400": {
      description: "Invalid input data",
    },
    "404": {
      description: "Product not found",
    },
    "500": {
      description: "Internal server error",
    },
  },
});
