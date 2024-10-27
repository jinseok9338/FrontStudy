import { desc, eq } from "drizzle-orm";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { todos } from "./models/dbSchema";
import { db } from "../../db/conncection";
import { HTTPException } from "hono/http-exception";
import { hc } from "hono/client";

const TodoApp = new OpenAPIHono();

const ParamSchema = z.object({
  id: z.string().openapi({
    param: { name: "id", in: "path" },
    type: "integer",
    example: "1",
  }),
});

TodoApp.openapi(
  createRoute({
    method: "get",
    path: "/",
    request: {
      params: z.object({
        size: z.string().optional().default("10"),
        page: z.string().optional().default("0"),
      }),
    },
    responses: {
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
                  createdAt: z.string(),
                  updatedAt: z.string(),
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
    },
  }),
  async (c) => {
    // Retrieve and parse query parameters
    const sizeParams = c.req.valid("param").size;
    const pageParams = c.req.valid("param").page;
    const size = sizeParams ? parseInt(sizeParams) : 10;
    const page = pageParams ? parseInt(pageParams) : 0;

    // Fetch paginated todos from the database
    const fetchedTodos = await db
      .select()
      .from(todos)
      .orderBy(desc(todos.createdAt))
      .limit(size)
      .offset(size * page);

    // Prepare the paginated response
    const response = {
      todos: fetchedTodos,
      total: (await db.select().from(todos)).length,
      hasMore: fetchedTodos.length === size,
      page,
      size,
    };

    return c.json(response);
  }
) as OpenAPIHono;

TodoApp.openapi(
  createRoute({
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              content: z.string().min(1),
            }),
            example: {
              content: "Hello World",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Create a new todo",
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
    },
  }),
  async (c) => {
    // Parse the request body
    const body = c.req.valid("json");

    // Insert a new todo into the database
    const newTodo = await db
      .insert(todos)
      .values({
        content: body.content,
        isCompleted: false,
      })
      .returning();

    // Return the created todo item as JSON
    return c.json(newTodo[0]);
  }
);

// Get a todo by ID
TodoApp.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    request: {
      params: ParamSchema,
    },
    responses: {
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
    },
  }),
  async (c) => {
    const idParam = c.req.valid("param").id;
    const id = parseInt(idParam);
    const todo = await db.select().from(todos).where(eq(todos.id, id));

    if (!todo || todo.length === 0) {
      throw new HTTPException(404, {
        message: "Not found",
        cause: "Todo not found",
      });
    }

    return c.json(todo[0]);
  }
);
TodoApp.openapi(
  createRoute({
    method: "put",
    path: "/{id}",
    request: {
      params: z.object({
        id: z
          .string()
          .min(1)
          .refine((val) => parseInt(val))
          .openapi({
            param: {
              name: "id",
              in: "path",
            },
            example: "1",
          }),
      }),
      body: {
        content: {
          "application/json": {
            schema: z.object({
              content: z.string().min(1),
              isCompleted: z.boolean(),
            }),
            example: {
              content: "Hello World",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Todo updated successfully",
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
        description: "Todo not found",
      },
    },
  }),
  async (c) => {
    const idParams = c.req.valid("param").id;
    if (!idParams) return c.json({ error: "Invalid ID" }, 400);
    const id = parseInt(idParams);
    const body = c.req.valid("json");

    const updatedTodo = await db
      .update(todos)
      .set({
        content: body.content,
        isCompleted: body.isCompleted,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, id))
      .returning();

    if (!updatedTodo.length) {
      throw new HTTPException(404, { message: "Not found" });
    }

    return c.json(updatedTodo[0]);
  }
);

const routes = TodoApp.openapi(
  createRoute({
    method: "delete",
    path: "/{id}",
    request: {
      params: z.object({
        id: z
          .string()
          .min(1)
          .refine((val) => parseInt(val))
          .openapi({
            param: {
              name: "id",
              in: "path",
              description: "The ID of the todo to delete must be number",
            },
            example: "1",
          }),
      }),
    },
    responses: {
      200: {
        description: "Todo deleted successfully",
        content: {
          "application/json": {
            schema: z.object({ success: z.boolean() }),
          },
        },
      },
      404: {
        description: "Todo not found",
      },
    },
  }),
  async (c) => {
    const paramId = c.req.param("id");
    if (!paramId) return c.json({ error: "Invalid ID" }, 400);
    const id = parseInt(paramId);
    const todo = await db.select().from(todos).where(eq(todos.id, id));
    if (!todo || todo.length === 0) {
      throw new HTTPException(404, {
        message: "Not found",
        cause: "Todo not found",
      });
    }
    try {
      await db.delete(todos).where(eq(todos.id, id));
      return c.json({ success: true });
    } catch (err) {
      throw new HTTPException(500, { message: "Server Error", cause: err });
    }
  }
);

export default TodoApp;

export type TodoAppType = typeof routes;
