import { z } from "zod";
import { userRepository, UserRepository } from "../repository/users.repository";
import {
  CreateUserSchema,
  UserResponseSchema,
  UserSchema,
} from "../models/schema";
import { HTTPException } from "hono/http-exception";
import { hashPassword } from "../../../utils";
import dayjs from "dayjs";
import {
  companyRepository,
  CompanyRepository,
} from "../../companies/repository/companies.repository";
import { GetUsersWithPaginationResponseSchema } from "../models/dto";

class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository
  ) {
    this.userRepository = userRepository;
    this.companyRepository = companyRepository;
  }

  async createUser(
    user: z.infer<typeof CreateUserSchema>
  ): Promise<z.infer<typeof UserResponseSchema>> {
    const existingUser = await this.userRepository.findExistingUser(user.email);
    if (existingUser?.length > 0) {
      throw new HTTPException(409, {
        message: "User with this email already exists",
      });
    }

    const isComapanyExist =
      (await this.companyRepository.findCompanyById(user.companyId)).length !==
      0;
    if (!isComapanyExist) {
      throw new HTTPException(404, {
        message: "Company not found",
      });
    }

    const hashedPassword = await hashPassword(user.password);

    const userData = {
      ...user,
      password: hashedPassword,
      createdBy: null,
      lastModifiedBy: null,
      deleted: false,
    };

    const newUser = await this.userRepository.createAndReturnUser(userData);
    const response = {
      ...newUser,
      createdAt: dayjs(newUser.createdAt).toDate(),
      updatedAt: dayjs(newUser.updatedAt).toDate(),
      deletedAt: newUser.deletedAt ? dayjs(newUser.deletedAt).toDate() : null,
      password: undefined,
      tempPassword: undefined,
    };
    const validatedResponse = UserResponseSchema.parse(response);
    return validatedResponse;
  }

  async getUserWithCompanyWithId(
    id: number
  ): Promise<z.infer<typeof UserResponseSchema>> {
    const validUser = await this.userRepository.findUserByIdWithCompany(id);
    return validUser;
  }

  async getUsersWithPagination(size: number, page: number) {
    if (size <= 0 || page <= 0) {
      throw new HTTPException(400, {
        message: "Size and page must be positive integers",
      });
    }
    // Fetch users from the repository with pagination logic
    const { users, total } = await this.userRepository.findUsers(size, page);
    // Calculate if there are more users to load
    const hasMore = total > page * size;

    // Parse and validate each user object with UserResponseSchema
    const validUsers = users.map((user) => {
      const { success, data: validUser } = UserResponseSchema.safeParse(user);
      if (!success) {
        throw new HTTPException(400, { message: "Invalid user data" });
      }
      return validUser;
    });

    // Return the paginated users response
    return {
      users: validUsers,
      total,
      hasMore,
      page,
      size,
    };
  }
  async blcokUsers(ids: number[]) {
    const response = await this.userRepository.blockUsers(ids);
    return response;
  }
}

export const userService = new UserService(userRepository, companyRepository);
