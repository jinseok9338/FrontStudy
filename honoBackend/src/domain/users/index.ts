import { OpenAPIHono } from "@hono/zod-openapi";
import { createUserRoute } from "./routes";
import { ErrorBuilder } from "../../error";
import { userService } from "./services/users.service";
const UserApp = new OpenAPIHono();

// create user route
UserApp.openapi(createUserRoute, async (c) => {
  try {
    const body = c.req.valid("json");
    const validatedResponse = await userService.createUser(body);
    console.log(validatedResponse, "validatedResponse");
    return c.json(validatedResponse, 200);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

export default UserApp;
