import { z } from "zod";
import { DB, db } from "../../../db/conncection";
import { UserResponseSchema, users, UserSchema } from "../models/schema";
import { and, eq } from "drizzle-orm";
import { companies } from "../../companies/models/schema";

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

  // Repository class method
  async createAndReturnUser(
    userData: typeof users.$inferInsert
  ): Promise<z.infer<typeof UserResponseSchema>> {
    try {
      const newUser = await this.db.insert(users).values(userData).returning();
      const validNewUser = UserSchema.parse(newUser[0]);
      const result = await db
        .select()
        .from(users)
        .innerJoin(companies, eq(users.companyId, companies.companyId));
      return {
        ...validNewUser,
        empNo: validNewUser.empNo ?? "",
        createdAt: validNewUser.createdAt,
        updatedAt: validNewUser.updatedAt,
        deletedAt: validNewUser.deletedAt ? validNewUser.deletedAt : null,
        company: result[0].companies,
      };
    } catch (error) {
      throw error;
    }
  }
}

export const userRepository = new UserRepository(db);
