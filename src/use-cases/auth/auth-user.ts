import Auth from "utils/Auth";
import { User } from "entities/User";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

interface LoginUserRequest {
  email: string;
  password: string;
}

export class AuthUser {
  constructor(private userRepository: ShowUserPerEmailRepository) {}
  async execute({ email, password }: LoginUserRequest) {
    const user = await this.userRepository.show(email);

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
