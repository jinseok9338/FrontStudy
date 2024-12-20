import { OpenAPIHono } from "@hono/zod-openapi";
import {
  blockUsersRoute,
  createUserRoute,
  deleteUserRoute,
  deleteUsersRoute,
  getUserByIdRoute,
  getUsersWithPagination,
  unBlockUsersRoute,
} from "./routes";
import { ErrorBuilder } from "../../error";
import { userService } from "./services/users.service";
import { appFactory } from "../../utils/route";
import { HTTPException } from "hono/http-exception";

const UserApp = appFactory();

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
    const user = c.get("user");
    const ids = body.userIds;
    const newUserIds = ids.filter((id: number) => id !== user.userId);
    await userService.blcokUsers(newUserIds);
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

UserApp.openapi(unBlockUsersRoute, async (c) => {
  try {
    const body = c.req.valid("json");
    const user = c.get("user");
    const ids = body.userIds;
    const newUserIds = ids.filter((id: number) => id !== user.userId);
    await userService.unBlcokUsers(newUserIds);
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

UserApp.openapi(deleteUserRoute, async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const user = c.get("user");
    if (id === user.userId) {
      throw new HTTPException(400, {
        message: "You cannot delete yourself",
      });
    }
    await userService.deleteUserById(id);

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

UserApp.openapi(deleteUsersRoute, async (c) => {
  try {
    const body = c.req.valid("json");

    const user = c.get("user");
    const ids = body.userIds;
    const newUserIds = ids.filter((id: number) => id !== user.userId);
    await userService.deleteUserByIds(newUserIds);
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
