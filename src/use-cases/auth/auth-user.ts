import Auth from "entities/Auth";
import { ShowUserRepository } from "repositories/user/show-user-repository";

interface LoginUserRequest {
  email: string;
  password: string;
}

export class AuthUser {
  constructor(private userRepository: ShowUserRepository) {}
  async execute({ email, password }: LoginUserRequest) {
    const user = await this.userRepository.show(email);

    if (!user) {
      throw Error("User not found");
    }

    const authenticated = Auth.authentication(user, password);

    return authenticated;
  }
}
