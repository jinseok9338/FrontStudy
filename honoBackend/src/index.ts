import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import TodoApp from "./domain/todos";
import { cors } from "hono/cors";

import { jwt, type JwtVariables } from "hono/jwt";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { logger } from "hono/logger";
import { compress } from "hono/compress";
import CompanyApp from "./domain/companies";
import UserApp from "./domain/users";
import AuthApp from "./domain/auth";
import { initAuthConfig } from "@hono/auth-js";
import Credentials from "@auth/core/providers/credentials";
import ProductApp from "./domain/products";
import CategoryApp from "./domain/products/categories";
import { bearerAuth } from "hono/bearer-auth";
import { verifyAndParseToken } from "./utils";
import { userRepository } from "./domain/users/repository/users.repository";

type Variables = JwtVariables;

const app = new OpenAPIHono<{ Variables: Variables }>();
export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest);
};

app.openAPIRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

// Register tags for each domain

app.use(logger(customLogger));

app.use("/*", cors());
app.use(
  "/*", // Apply middleware globally
  async (c, next) => {
    if (
      c.req.path.startsWith("/auth") ||
      c.req.path.startsWith("/doc") ||
      c.req.path.startsWith("/swagger-ui")
    ) {
      return next();
    }

    // Apply bearerAuth for all other routes
    return bearerAuth({
      headerName: "Authorization",
      async verifyToken(token, c) {
        const payload = verifyAndParseToken(token);
        const user = await userRepository.findUserById(payload.userId);
        if (user.length === 0) {
          return false;
        }
        return true;
      },
    })(c, next);
  }
);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});
app.use("/doc/*", prettyJSON());
app.use(prettyJSON());
app.use("*", requestId());
app.route("/todos", TodoApp);
app.route("/companies", CompanyApp);
app.route("/users", UserApp);
app.route("/auth", AuthApp);
app.route("products", ProductApp);
app.route("/categories", CategoryApp);
app.get(
  "/swagger-ui",
  swaggerUI({
    url: "/doc",
    persistAuthorization: true,
    docExpansion: "list",
  })
);

export default {
  port: 8000,
  fetch: app.fetch,
};
