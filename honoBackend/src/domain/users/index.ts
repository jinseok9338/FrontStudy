import { OpenAPIHono } from "@hono/zod-openapi";
import { createUserRoute, getUserByIdRoute } from "./routes";
import { ErrorBuilder } from "../../error";
import { userService } from "./services/users.service";
import { UserResponseSchema } from "./models/schema";

const UserApp = new OpenAPIHono();

// create user route
UserApp.openapi(createUserRoute, async (c) => {
  try {
    const body = c.req.valid("json");
    const validatedResponse = await userService.createUser(body);
    return c.json(validatedResponse, 201);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

UserApp.openapi(getUserByIdRoute, async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const response = await userService.getUserWithCompanyWithId(id);
    return c.json(response, 200);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

export default UserApp;
