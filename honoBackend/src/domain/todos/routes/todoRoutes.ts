import { createRoute } from "@hono/zod-openapi";
import {
  GetTodoResponseSchema,
  GetTodosWithPaginationResponseSchema,
  ParamSchema,
  QuerySchema,
} from "../models/dtoShema";

export const getTodoRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: ParamSchema,
  responses: GetTodoResponseSchema,
});
