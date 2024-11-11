import { HTTPException } from "hono/http-exception";
import bcrypt from "bcrypt";

import { generateAccessToken, generateRefreshToken } from "../../../utils";
import {
  UserRepository,
  userRepository,
} from "../../users/repository/users.repository";

class AuthService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  loginUser = async (
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> => {
    const [user] = await this.userRepository.findExistingUser(email);
    // check if the password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HTTPException(401, {
        message: "Invalid email or password",
      });
    }
    if (user.isBlocked && user.role !== "SUPER_ADMIN") {
      throw new HTTPException(403, {
        message: "User is blocked",
      });
    }
    if (user.role === "ADMIN") {
      throw new HTTPException(403, {
        message: "Only User can log in to the StoreFront",
      });
    }

    // generate jwt token
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { accessToken, refreshToken };
  };

  loginAdmin = async (email: string, password: string) => {
    const [user] = await this.userRepository.findExistingUser(email);
    // check if the password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HTTPException(401, {
        message: "Invalid email or password",
      });
    }
    if (user.isBlocked && user.role !== "SUPER_ADMIN") {
      throw new HTTPException(403, {
        message: "User is blocked",
      });
    }

    if (user.role === "USER") {
      throw new HTTPException(403, { message: "Insufficient permissions" });
    }

    // generate jwt token
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { accessToken, refreshToken };
  };
}

export const authService = new AuthService(userRepository);
