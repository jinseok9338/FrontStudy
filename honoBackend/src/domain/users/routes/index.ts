import { createRoute } from "@hono/zod-openapi";
import {
  CreateUser,
  CreateUserSchema,
  User,
  UserSchema,
} from "../models/schema";

export const createUserRoute = createRoute({
  path: "/",
  method: "post",
  description: "User Creation",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateUserSchema,
        },
      },
    },
  },
  responses: {
    "200": {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: UserSchema,
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
