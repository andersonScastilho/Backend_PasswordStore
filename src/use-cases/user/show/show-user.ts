import { User } from "entities/User";
import { ShowUserRepository } from "repositories/user/show-user-repository";

export class ShowUser {
  constructor(private showUserRepository: ShowUserRepository) {}
  async execute(userId: string) {
    const user = await this.showUserRepository.show({ userId: userId });

    if (!user) {
      throw Error("User not found");
    }

    const instanceUser = new User({
      userEmail: user.email,
      userFullName: user.fullName,
      userId: user.id,
      userPassword: user.password_hash,
    });

    return instanceUser;
  }
}
