import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../domain/users/models/schema";

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
    { expiresIn: "1h" }
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
