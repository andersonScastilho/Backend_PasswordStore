import { User } from "entities/User";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import { UpdateUserRepository } from "repositories/user/update-user-repository";

interface UpdateUserRequest {
  userId: string;
  email?: string;
  oldPassword?: string;
  fullName?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

export class UpdateUser {
  constructor(
    private showUserPerUserIdRepository: ShowUserPerUserIdRepository,
    private updateUserRepository: UpdateUserRepository
  ) {}
  async handle({
    userId,
    email,
    fullName,
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  }: UpdateUserRequest) {
    const userSchema = await this.showUserPerUserIdRepository.show(userId);

    if (!userSchema) {
      throw Error("User not found");
    }

    const user = new User({
      userId: userSchema.id,
      userEmail: email || userSchema.email,
      userFullName: fullName || userSchema.fullName,
      userPassword: userSchema.password_hash,
    });

    if (newPassword && oldPassword && newPasswordConfirmation) {
      await user.updatePassword(
        oldPassword,
        newPassword,
        newPasswordConfirmation
      );
    }

    const updatedUser = await this.updateUserRepository.update(user);

    return updatedUser;
  }
}
