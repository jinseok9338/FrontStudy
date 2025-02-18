import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import type { JwtVariables } from "hono/jwt";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import CompanyApp from "./domain/companies";
import TodoApp from "./domain/todos";

type Variables = JwtVariables;

const app = new OpenAPIHono<{ Variables: Variables }>();
const secret = process.env.JWT_SECRET ?? "secret";
export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest);
};

app.use(logger(customLogger));
app.use("/*", cors());
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.use(prettyJSON());
app.use("*", requestId());
app.route("/todos", TodoApp);
app.route("/companies", CompanyApp);
// app.route("/users", UserApp);
app.get("/swagger-ui", swaggerUI({ url: "/doc" }));

try {
  serve({
    fetch: app.fetch,
    port: 8000,
  });
  console.log("Server is running on port 8000");
} catch (error) {
  console.error(error);
}
