import { createRoute, z } from "@hono/zod-openapi";
import {
  CreateUser,
  CreateUserSchema,
  User,
  UserResponseSchema,
  UserSchema,
} from "../models/schema";
import { ParamSchema, QuerySchema } from "../../todos/models/dtoShema";
import {
  GetUsersWithPaginationResponseSchema,
  UserQuerySchema,
} from "../models/dto";

export const createUserRoute = createRoute({
  path: "/",
  method: "post",
  tags: ["Users"],
  description: "User Creation",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateUserSchema.openapi("CreateUserRequest"),
        },
      },
    },
  },
  responses: {
    "201": {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: UserResponseSchema.openapi("UserResponse"),
        },
      },
    },
    "400": {
      description: "Invalid input data",
    },
    "409": {
      description: "Same user with this email already exists",
    },
    "500": {
      description: "Internal server error",
    },
  },
});

export const getUsersWithPagination = createRoute({
  method: "get",
  path: "/",
  tags: ["Users"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: UserQuerySchema,
  responses: {
    ...GetUsersWithPaginationResponseSchema,
    401: { description: "Unauthorized" },
  },
});

export const getUserByIdRoute = createRoute({
  path: "/{id}",
  method: "get",
  tags: ["Users"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: "Get User With Company By ID",
  request: ParamSchema,
  responses: {
    "200": {
      description: "Get User With Company By ID",
      content: {
        "application/json": {
          schema: UserResponseSchema.openapi("UserResponse"),
        },
      },
    },
    "404": {
      description: "User not found",
    },
  },
});

export const blockUsersRoute = createRoute({
  path: "/block",
  method: "post",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: ["Users"],
  description: "Block Users with ID",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              userIds: z.array(z.number()),
            })
            .openapi("BlockUsersRequest"),
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Unblock Users",
      content: {
        "application/json": {
          schema: z.object({
            successs: z.boolean(),
          }),
        },
      },
    },
    "404": {
      description: "User not found",
    },
  },
});

export const unBlockUsersRoute = createRoute({
  path: "/un-block",
  method: "post",
  tags: ["Users"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: "unblock Users with ID",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              userIds: z.array(z.number()),
            })
            .openapi("UnBlockUsersRequest"),
        },
      },
    },
  },
  responses: {
    "201": {
      description: "UnBlock Users",
      content: {
        "application/json": {
          schema: z.object({
            successs: z.boolean(),
          }),
        },
      },
    },
    "404": {
      description: "User not found",
    },
  },
});

export const deleteUserRoute = createRoute({
  path: "/{id}",
  method: "delete",
  tags: ["Users"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: "delete Users with ID",
  request: ParamSchema,
  responses: {
    "201": {
      description: "delete Users with ID",
      content: {
        "application/json": {
          schema: z.object({
            successs: z.boolean(),
          }),
        },
      },
    },
    "404": {
      description: "User not found",
    },
  },
});

export const deleteUsersRoute = createRoute({
  path: "/bulk-delete",
  method: "post",
  tags: ["Users"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: "delete Users with IDs",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              userIds: z.array(z.number()),
            })
            .openapi("DeleteUsersRequest"),
        },
      },
    },
  },
  responses: {
    "201": {
      description: "delete Users with IDs",
      content: {
        "application/json": {
          schema: z.object({
            successs: z.boolean(),
          }),
        },
      },
    },
    "404": {
      description: "User not found",
    },
  },
});
