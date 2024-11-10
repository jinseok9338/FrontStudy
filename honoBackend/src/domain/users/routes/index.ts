import { createRoute, z } from "@hono/zod-openapi";
import {
  CreateUser,
  CreateUserSchema,
  User,
  UserResponseSchema,
  UserSchema,
} from "../models/schema";
import { ParamSchema } from "../../todos/models/dtoShema";

export const createUserRoute = createRoute({
  path: "/",
  method: "post",
  tags: ["Users"],
  description: "User Creation",
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

export const getUserByIdRoute = createRoute({
  path: "/{id}",
  method: "get",
  tags: ["Users"],
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
