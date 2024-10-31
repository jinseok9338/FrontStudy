import { db } from "../../../db/conncection";
import { users } from "../models/schema";
import { and, eq } from "drizzle-orm";

// Database query function to check existing user
export async function findExistingUser(email: string) {
  try {
    const usersArray = db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.deleted, false)));
    return usersArray;
  } catch (error) {
    throw error;
  }
}

// Database query function to create user
export async function createAndReturnUser(userData: typeof users.$inferInsert) {
  return db.insert(users).values(userData).returning();
}
