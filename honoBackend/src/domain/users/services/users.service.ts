import { z } from "zod";
import { userRepository, UserRepository } from "../repository/users.repository";
import { CreateUserSchema, UserSchema } from "../models/schema";
import { HTTPException } from "hono/http-exception";
import { hashPassword } from "../../../utils";
import dayjs from "dayjs";
import {
  companyRepository,
  CompanyRepository,
} from "../../companies/repository/companies.repository";

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
  ): Promise<z.infer<typeof UserSchema>> {
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

    const [newUser] = await this.userRepository.createAndReturnUser(userData);
    const response = {
      ...newUser,
      createdAt: dayjs(newUser.createdAt).toDate(),
      updatedAt: dayjs(newUser.updatedAt).toDate(),
      deletedAt: newUser.deletedAt ? dayjs(newUser.deletedAt).toDate() : null,
      password: undefined,
      tempPassword: undefined,
    };
    const validatedResponse = UserSchema.parse(response);
    return validatedResponse;
  }
}

export const userService = new UserService(userRepository, companyRepository);
