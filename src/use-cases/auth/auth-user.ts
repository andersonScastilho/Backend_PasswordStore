import jwt from "jsonwebtoken";

import { UserRepository } from "repositories/user-repository";

interface LoginUserRequest {
  email: string;
  password: string;
}

export class AuthUser {
  constructor(private userRepository: UserRepository) {}
  async execute({ email, password }: LoginUserRequest) {
    const user = await this.userRepository.verifyUserExist(email);

    if (!user) {
      throw Error("User not found");
    }

    const passwordIsValid = user.comparePasswords(password);

    if (!passwordIsValid) {
      throw Error("Invalid password");
    }

    const token = jwt.sign(
      { id: user.userId },
      process.env.TOKEN_SECRET ?? "",
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );

    return token;
  }
}
