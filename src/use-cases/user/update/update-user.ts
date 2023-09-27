import { User } from "entities/User";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import { UpdateUserRepository } from "repositories/user/update-user-repository";
import { myEmitter } from "service/events/user-events";

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
    private showUserPerUserEmailRepository: ShowUserPerEmailRepository,
    private updateUserRepository: UpdateUserRepository
  ) {}
  async execute({
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

    if (email) {
      const userEmail = await this.showUserPerUserEmailRepository.show(email);

      if (userEmail) {
        throw Error("Email in use");
      }
    }

    const user = new User({
      userId: userSchema.id,
      userEmail: userSchema.email,
      userFullName: userSchema.fullName,
      userPassword: userSchema.password_hash,
      verifiedEmail: userSchema.verifiedEmail,
    });

    await user.updateUser({
      email: email,
      fullName: fullName,
      userId,
      newPassword,
      oldPassword,
      newPasswordConfirmation,
    });

    const updatedUser = await this.updateUserRepository.update(user);

    if (email) {
      myEmitter.emit("user/email/not-verified", updatedUser.id);
    }

    return updatedUser;
  }
}
