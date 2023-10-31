import { User } from "entities/user/User";
import { BadRequest } from "helpers/classes/BadRequest";
import { NotFound } from "helpers/classes/NotFound";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import { UpdateUserRepository } from "repositories/user/update-user-repository";
import { myEmitter } from "service/events/user-events";

interface updateUserPassword {
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

export class UpdateUser {
  constructor(
    private user: User,
    private showUserPerUserIdRepository: ShowUserPerUserIdRepository,
    private showUserPerUserEmailRepository: ShowUserPerEmailRepository,
    private updateUserRepository: UpdateUserRepository
  ) {}
  async execute({
    newPassword,
    newPasswordConfirmation,
    oldPassword,
  }: updateUserPassword) {
    const userSchema = await this.showUserPerUserIdRepository.show(
      this.user.userId
    );

    if (!userSchema) {
      throw new NotFound("User not found");
    }

    if (this.user.userEmail !== "") {
      const userEmail = await this.showUserPerUserEmailRepository.show(
        this.user.userEmail
      );

      if (userEmail) {
        throw new BadRequest("Email in use");
      }
    } else {
      this.user.updateEmail = userSchema.email;
    }

    if (this.user.userFullName === "") {
      this.user.updateFullName = userSchema.fullName;
    }

    if (newPassword && newPasswordConfirmation && oldPassword) {
      await this.user.updatePassword({
        newPassword,
        newPasswordConfirmation,
        oldPassword,
      });
    }

    const updatedUser = await this.updateUserRepository.update(this.user);

    if (updatedUser.email !== userSchema.email) {
      myEmitter.emit("user/email/not-verified", this.user.userId);
    }

    return updatedUser;
  }
}
