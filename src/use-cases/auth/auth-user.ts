import { User } from "entities/User";
import Auth from "provider/Auth";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

interface LoginUserRequest {
  email: string;
  password: string;
}

export class AuthUser {
  constructor(private showUserPerEmailRepository: ShowUserPerEmailRepository) {}
  async execute({ email, password }: LoginUserRequest) {
    const user = await this.showUserPerEmailRepository.show(email);

    if (!user) {
      throw Error("User not found");
    }
    const instanceUser = new User({
      userEmail: user.email,
      userFullName: user.fullName,
      userId: user.id,
      userPassword: user.password_hash,
    });

    const auth = new Auth();

    const authenticated = auth.authentication(instanceUser, password);

    return authenticated;
  }
}
