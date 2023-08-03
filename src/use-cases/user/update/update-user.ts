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
    const user = await this.showUserPerUserIdRepository.show(userId);

    if (!user) {
      throw Error("User not found");
    }

    const instanceUser = new User({
      userId: user.id,
      userEmail: user.email,
      userFullName: user.fullName,
      userPassword: user.password_hash,
    });

    if (fullName) {
      instanceUser.updateUserFullName = fullName;
    }

    if (newPassword && oldPassword && newPasswordConfirmation) {
      instanceUser.updatePassword(
        oldPassword,
        newPassword,
        newPasswordConfirmation
      );
    }

    if (email) {
      instanceUser.updateUserEmail = email;
    }

    const updatedUser = await this.updateUserRepository.update({
      userId: instanceUser.userId,
      email: instanceUser.userEmail,
      fullName: instanceUser.userFullName,
      newPassword: instanceUser.userPassword,
    });

    return updatedUser;
  }
}
