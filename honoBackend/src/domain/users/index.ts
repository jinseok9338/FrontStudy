import { OpenAPIHono } from "@hono/zod-openapi";
import { createUserRoute } from "./routes";
import { CreateUserSchema, UserSchema } from "./models/schema";
import { HTTPException } from "hono/http-exception";
import { createAndReturnUser, findExistingUser } from "./repository";
import { hashPassword } from "../../utils";
import dayjs from "dayjs";
import { ErrorBuilder } from "../../error";
import { findCompanyById } from "../companies/repository";

const UserApp = new OpenAPIHono();

// create user route
UserApp.openapi(createUserRoute, async (c) => {
  try {
    const body = c.req.valid("json");

    const existingUser = await findExistingUser(body.email);
    if (existingUser?.length > 0) {
      throw new HTTPException(409, {
        message: "User with this email already exists",
      });
    }

    const isComapanyExist =
      (await findCompanyById(body.companyId)).length !== 0;
    if (!isComapanyExist) {
      throw new HTTPException(404, {
        message: "Company not found",
      });
    }

    const hashedPassword = await hashPassword(body.password);

    const userData = {
      ...body,
      password: hashedPassword,
      createdBy: null,
      lastModifiedBy: null,
      deleted: false,
    };

    const [newUser] = await createAndReturnUser(userData);
    const response = {
      ...newUser,
      createdAt: dayjs(newUser.createdAt).toDate(),
      updatedAt: dayjs(newUser.updatedAt).toDate(),
      deletedAt: newUser.deletedAt ? dayjs(newUser.deletedAt).toDate() : null,
      password: undefined,
      tempPassword: undefined,
    };
    const validatedResponse = UserSchema.parse(response);
    return c.json(validatedResponse, 200);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

export default UserApp;
