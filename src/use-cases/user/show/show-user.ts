import { User } from "entities/User";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";

export class ShowUser {
  constructor(private showUserRepository: ShowUserPerUserIdRepository) {}
  async execute(userId: string) {
    const user = await this.showUserRepository.show(userId);

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
