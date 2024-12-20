import { z } from "zod";
import { DB, db } from "../../../db/conncection";
import { UserResponseSchema, users, UserSchema } from "../models/schema";
import { and, eq, getTableColumns, ilike, inArray, like } from "drizzle-orm";
import { companies, companySchema } from "../../companies/models/schema";
import {
  companyRepository,
  CompanyRepository,
} from "../../companies/repository/companies.repository";
import { HTTPException } from "hono/http-exception";

export class UserRepository {
  constructor(
    private readonly db: DB,
    private readonly companyRepository: CompanyRepository
  ) {
    this.db = db;
  }

  findUserById = async (id: number) => {
    return this.db
      .select()
      .from(users)
      .where(and(eq(users.userId, id), eq(users.deleted, false)))
      .limit(1);
  };

  findUserByIdWithCompany = async (
    id: number
  ): Promise<z.infer<typeof UserResponseSchema>> => {
    const [user] = await this.findUserById(id);
    const { success, data: validUser } = UserSchema.safeParse(user);

    if (!success) {
      throw new HTTPException(404, {
        message: "User not found",
      });
    }

    const [company] = await this.companyRepository.findCompanyById(
      validUser.companyId
    );
    const { success: companySuccess, data: validCompany } =
      companySchema.safeParse(company);
    if (!companySuccess) {
      throw new HTTPException(404, {
        message: "There is no company ",
      });
    }
    // get rid of companyId from user object

    return {
      ...validUser,
      empNo: validUser.empNo ?? "",
      createdAt: validUser.createdAt,
      updatedAt: validUser.updatedAt,
      deletedAt: validUser.deletedAt ? validUser.deletedAt : null,
      company: validCompany,
    };
  };

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

  findUsers = async (
    size: number,
    page: number,
    condition: {
      name?: string;
      email?: string;
      empNo?: string;
    }
  ) => {
    try {
      // Calculate the offset based on the current page and size and the user must have company field which will be Company Schema
      const offset = (page - 1) * size;
      const conditionName = `%${condition.name}%`;
      const conditionEmail = `%${condition.email}%`;
      const conditionEmpNo = `%${condition.empNo}%`;
      const usersResponse = await this.db
        .select({
          ...getTableColumns(users),
        })
        .from(users)
        .where(
          and(
            eq(users.deleted, false),
            condition.name ? ilike(users.name, conditionName) : undefined,
            condition.email ? ilike(users.email, conditionEmail) : undefined,
            condition.empNo ? ilike(users.empNo, conditionEmpNo) : undefined
          )
        )
        .limit(size)
        .offset(offset)
        .execute();
      const usersResponsePromise = usersResponse.map(async (user) => {
        const [company] = await this.companyRepository.findCompanyById(
          user.companyId ?? 0
        );
        const { success, data: validCompany } =
          companySchema.safeParse(company);
        if (!success) {
          throw new HTTPException(404, {
            message: "There is no company ",
          });
        }
        return {
          ...user,
          empNo: user.empNo ?? "",
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          deletedAt: user.deletedAt ? user.deletedAt : null,
          company: validCompany,
        };
      });
      const usersResponseResolved = await Promise.all(usersResponsePromise);
      const total = (
        await this.db.select().from(users).where(eq(users.deleted, false))
      ).length;
      return { users: usersResponseResolved, total: total };
    } catch (error) {
      console.error("Error fetching paginated users:", error);
      throw new HTTPException(500, { message: "Internal server error" });
    }
  };

  // Repository class method
  async createAndReturnUser(
    userData: typeof users.$inferInsert
  ): Promise<z.infer<typeof UserResponseSchema>> {
    try {
      const newUser = await this.db.insert(users).values(userData).returning();
      const validNewUser = UserSchema.parse(newUser[0]);

      const [company] = await this.companyRepository.findCompanyById(
        validNewUser.companyId
      );
      return {
        ...validNewUser,
        empNo: validNewUser.empNo ?? "",
        createdAt: validNewUser.createdAt,
        updatedAt: validNewUser.updatedAt,
        deletedAt: validNewUser.deletedAt ? validNewUser.deletedAt : null,
        company: company,
      };
    } catch (error) {
      throw error;
    }
  }

  async blockUsers(userIds: number[]) {
    try {
      await this.db
        .update(users)
        .set({ isBlocked: true })
        .where(inArray(users.userId, userIds))
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async unBlockUsers(userIds: number[]) {
    try {
      await this.db
        .update(users)
        .set({ isBlocked: false })
        .where(inArray(users.userId, userIds))
        .execute();
    } catch (error) {
      throw error;
    }
  }
  async deleteUserById(userId: number) {
    try {
      await this.db
        .update(users)
        .set({ deleted: true })
        .where(eq(users.userId, userId))
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async deleteUserByIds(userIds: number[]) {
    try {
      await this.db
        .update(users)
        .set({ deleted: true })
        .where(inArray(users.userId, userIds))
        .execute();
    } catch (error) {
      throw error;
    }
  }
}

export const userRepository = new UserRepository(db, companyRepository);
