import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import TodoApp from "./domain/todos";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { logger } from "hono/logger";
import { compress } from "hono/compress";
import CompanyApp from "./domain/companies";
import UserApp from "./domain/users";

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

// app.use(
//   "/todos/*",
//   jwt({
//     secret,
//   })
// );
app.use(prettyJSON());
app.use("*", requestId());
app.route("/todos", TodoApp);
app.route("/companies", CompanyApp);
app.route("/users", UserApp);
app.get("/swagger-ui", swaggerUI({ url: "/doc" }));

export default {
  port: 8000,
  fetch: app.fetch,
};
