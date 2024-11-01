import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { jwt } from "hono/jwt";
import bcrypt from "bcrypt";
import { findExistingUser } from "../users/repository";
import { HTTPException } from "hono/http-exception";
import { generateAccessToken, generateRefreshToken } from "../../utils";
import { ErrorBuilder } from "../../error";

const AuthApp = new OpenAPIHono();

AuthApp.openapi(
  createRoute({
    path: "/admin/login",
    method: "post",
    description: "Admin Login",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              email: z.string().email(),
              password: z.string().min(6),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: "Admin login successful",
        content: {
          "application/json": {
            schema: z.object({
              access_token: z.string(),
              refresh_token: z.string(),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");
    const { email, password } = body;
    try {
      const [user] = await findExistingUser(email);
      // check if the password is correct
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new HTTPException(401, {
          message: "Invalid email or password",
        });
      }
      if (user.role === "USER") {
        throw new HTTPException(403, { message: "Insufficient permissions" });
      }

      // generate jwt token
      const accessToken = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);
      return c.json({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      return ErrorBuilder(error);
    }
  }
);

AuthApp.openapi(
  createRoute({
    path: "/user/login",
    method: "post",
    description: "User Login",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              email: z.string().email(),
              password: z.string().min(6),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: "Admin login successful",
        content: {
          "application/json": {
            schema: z.object({
              access_token: z.string(),
              refresh_token: z.string(),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");
    const { email, password } = body;
    try {
      const [user] = await findExistingUser(email);
      // check if the password is correct
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new HTTPException(401, {
          message: "Invalid email or password",
        });
      }
      if (user.role !== "USER") {
        throw new HTTPException(403, {
          message: "Only User can log in to the StoreFront",
        });
      }

      // generate jwt token
      const accessToken = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);
      return c.json({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      return ErrorBuilder(error);
    }
  }
);

// AuthApp.openapi({
//   method: "post",
//   description: "User Login",
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: z.object({
//             email: z.string().email(),
//             password: z.string().min(6),
//           }),
//         },
//       },
//     },
//   },
//   responses: {
//     200: {
//       description: "User createdsuccessful",
//       content: {
//         "application/json": {
//           schema: z.object({
//             access_token: z.string(),
//             refresh_token: z.string(),
//           }),
//         },
//       },
//     },
//   },
// });

export default AuthApp;
