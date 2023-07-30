import Auth from "entities/Auth";

import { UserRepository } from "repositories/user/create-user-repository";

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

    const authenticated = Auth.authentication(user, password);

    return authenticated;
  }
}
