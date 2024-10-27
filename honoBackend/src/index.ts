import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import TodoApp from "./domain/todos";

const app = new OpenAPIHono();

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.route("/todos", TodoApp);
app.get("/swagger-ui", swaggerUI({ url: "/doc" }));

export default {
  port: 8000,
  fetch: app.fetch,
};
