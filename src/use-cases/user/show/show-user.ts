import { User } from "entities/User";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";

export class ShowUser {
  constructor(private showUserRepository: ShowUserPerUserIdRepository) {}
  async execute(userId: string) {
    const userSchema = await this.showUserRepository.show(userId);

    if (!userSchema) {
      throw Error("User not found");
    }

    const user = new User({
      userEmail: userSchema.email,
      userFullName: userSchema.fullName,
      userId: userSchema.id,
      userPassword: userSchema.password_hash,
    });

    return user;
  }
}
