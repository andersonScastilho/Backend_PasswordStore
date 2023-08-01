import Auth from "entities/Auth";
import { User } from "entities/User";
import { ShowUserRepository } from "repositories/user/show-user-repository";

interface LoginUserRequest {
  email: string;
  password: string;
}

export class AuthUser {
  constructor(private userRepository: ShowUserRepository) {}
  async execute({ email, password }: LoginUserRequest) {
    const user = await this.userRepository.show({ email: email });

    if (!user) {
      throw Error("User not found");
    }
    const instanceUser = new User({
      userEmail: user.email,
      userFullName: user.fullName,
      userId: user.id,
      userPassword: user.password_hash,
    });

    const authenticated = Auth.authentication(instanceUser, password);

    return authenticated;
  }
}
