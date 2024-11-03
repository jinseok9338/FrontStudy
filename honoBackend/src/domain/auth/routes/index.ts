import { createRoute } from "@hono/zod-openapi";
import { LoginRequestSchema, AuthResponseSchema } from "../models/schema";

export const AdminLoginRoute = createRoute({
  path: "/admin/login",
  method: "post",
  tags: ["Auth"],
  description: "Admin Login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginRequestSchema.openapi("LoginRequest"),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Admin login successful",
      content: {
        "application/json": {
          schema: AuthResponseSchema.openapi("AuthResponse"),
        },
      },
    },
  },
});

export const UserLoginRoute = createRoute({
  path: "/user/login",
  tags: ["Auth"],
  method: "post",
  description: "User Login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Admin login successful",
      content: {
        "application/json": {
          schema: AuthResponseSchema,
        },
      },
    },
  },
});
