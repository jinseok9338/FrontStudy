import { OpenAPIHono } from "@hono/zod-openapi";
import { UserType } from "../domain/users/models/schema";

export type UserVariables = {
  user: UserType;
};

export function appFactory() {
  const app = new OpenAPIHono<{
    Variables: {
      user: UserType;
    };
  }>();
  return app;
}
