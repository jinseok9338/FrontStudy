import { OpenAPIHono } from "@hono/zod-openapi";
import { ErrorBuilder } from "../../error";
import { AdminLoginRoute, UserLoginRoute } from "./routes";
import { authService } from "./services/auth.service";

const AuthApp = new OpenAPIHono();

AuthApp.openapi(AdminLoginRoute, async (c) => {
  const body = c.req.valid("json");
  const { email, password } = body;
  try {
    const response = await authService.loginAdmin(email, password);
    return c.json(response);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

AuthApp.openapi(UserLoginRoute, async (c) => {
  const body = c.req.valid("json");
  const { email, password } = body;
  try {
    const response = await authService.loginUser(email, password);
    return c.json(response);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

export default AuthApp;
