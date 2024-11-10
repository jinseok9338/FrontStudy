import { createRoute } from "@hono/zod-openapi";
import { QuerySchema } from "../../todos/models/dtoShema";
import { GetProductsWithPaginationResponseSchema } from "../models/dto";

export const getProductsWithPagination = createRoute({
  method: "get",
  path: "/",
  tags: ["Products"],
  request: QuerySchema,
  responses: {
    ...GetProductsWithPaginationResponseSchema,
    401: { description: "Unauthorized" },
  },
});
