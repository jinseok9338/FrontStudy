import { z } from "zod";

export const ParamSchema = {
  params: z.object({
    id: z.string().openapi({
      param: { name: "id", in: "path" },
      type: "integer",
      example: "1",
    }),
  }),
};

export const QuerySchema = {
  query: z.object({
    size: z.string().optional().default("10"),
    page: z.string().optional().default("0"),
  }),
};

export const GetTodosWithPaginationResponseSchema = {
  200: {
    description: "Fetch paginated list of todos",
    content: {
      "application/json": {
        schema: z.object({
          todos: z.array(
            z.object({
              id: z.number(),
              content: z.string(),
              isCompleted: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
          ),
          total: z.number(),
          hasMore: z.boolean(),
          page: z.number(),
          size: z.number(),
        }),
      },
    },
  },
};

export type TodosResponsType = z.infer<
  (typeof GetTodosWithPaginationResponseSchema)["200"]["content"]["application/json"]["schema"]
>;

export const GetTodoResponseSchema = {
  200: {
    description: "Get a todo by ID",
    content: {
      "application/json": {
        schema: z.object({
          id: z.number(),
          content: z.string(),
          isCompleted: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
      },
    },
  },
  404: {
    description: "Not found",
  },
  400: {
    description: "Invalid ID",
  },
};
