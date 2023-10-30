import { myEmitter } from "service/events/user-events";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
import { NotFound } from "helpers/classes/NotFound";

export class VerifyEmail {
  constructor(private showUserPerEmailRepository: ShowUserPerEmailRepository) {}
  async execute(email: string) {
    const userSchema = await this.showUserPerEmailRepository.show(email);

    if (!userSchema) {
      throw new NotFound("User not found");
    }

    myEmitter.emit("user/sendEmail-verify", userSchema.email, userSchema.id);

    return;
  }
}
