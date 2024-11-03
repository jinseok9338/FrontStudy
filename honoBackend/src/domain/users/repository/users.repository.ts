import { DB, db } from "../../../db/conncection";
import { users } from "../models/schema";
import { and, eq } from "drizzle-orm";

export class UserRepository {
  constructor(private readonly db: DB) {
    this.db = db;
  }

  findExistingUser = async (email: string) => {
    try {
      const usersArray = this.db
        .select()
        .from(users)
        .where(and(eq(users.email, email), eq(users.deleted, false)));
      return usersArray;
    } catch (error) {
      throw error;
    }
  };

  createAndReturnUser(userData: typeof users.$inferInsert) {
    return this.db.insert(users).values(userData).returning();
  }
}

export const userRepository = new UserRepository(db);
