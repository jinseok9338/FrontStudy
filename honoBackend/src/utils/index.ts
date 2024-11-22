import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../domain/users/models/schema";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import "dotenv/config";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Token generation utilities
export const generateAccessToken = async (user: typeof users.$inferSelect) => {
  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      role: user.role,
      auth: user.auth,
    },

    process.env.JWT_SECRET!, // Make sure to set this in your environment variables
    { expiresIn: "1d" }
  );
};

export const generateRefreshToken = async (user: typeof users.$inferSelect) => {
  return jwt.sign(
    {
      userId: user.userId,
      tokenType: "refresh",
    },
    process.env.JWT_REFRESH_SECRET!, // Make sure to set this in your environment variables
    { expiresIn: "7d" }
  );
};

const AccessTokenPayloadSchema = z.object({
  userId: z.number(),
  email: z.string(),
  role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]),
  auth: z.enum(["READ", "ALL"]),
  iat: z.number(),
  exp: z.number(),
});

export const verifyAndParseToken = (token: string) => {
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    const { success, data } = AccessTokenPayloadSchema.safeParse(verified);
    if (!success) {
      throw new HTTPException(401, {
        message: "Invalid token",
      });
    }
    return data;
  } catch (e) {
    throw new HTTPException(401, {
      message: "Invalid token",
    });
  }
};
