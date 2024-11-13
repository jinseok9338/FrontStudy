import { OpenAPIHono } from "@hono/zod-openapi";
import {
  blockUsersRoute,
  createUserRoute,
  getUserByIdRoute,
  getUsersWithPagination,
} from "./routes";
import { ErrorBuilder } from "../../error";
import { userService } from "./services/users.service";

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

UserApp.openapi(getUsersWithPagination, async (c) => {
  try {
    const params = c.req.valid("query");
    const { size: sizeParams, page: pageParams, ...rest } = params;

    const size = sizeParams ? parseInt(sizeParams) : 10;
    const page = pageParams ? parseInt(pageParams) : 0;

    const validatedResponse = await userService.getUsersWithPagination(
      size,
      page,
      rest
    );
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

UserApp.openapi(blockUsersRoute, async (c) => {
  try {
    const body = c.req.valid("json");
    const ids = body.userIds;
    await userService.blcokUsers(ids);
    return c.json(
      {
        success: true,
      },
      200
    );
  } catch (error) {
    return ErrorBuilder(error);
  }
});

UserApp.openapi(blockUsersRoute, async (c) => {
  try {
    const body = c.req.valid("json");
    const ids = body.userIds;
    await userService.unBlcokUsers(ids);
    return c.json(
      {
        success: true,
      },
      200
    );
  } catch (error) {
    return ErrorBuilder(error);
  }
});

export default UserApp;
