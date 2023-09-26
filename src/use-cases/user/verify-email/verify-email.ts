import { myEmitter } from "service/events/user-events";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

export class VerifyEmail {
  constructor(private showUserPerEmailRepository: ShowUserPerEmailRepository) {}
  async execute(email: string) {
    const userSchema = await this.showUserPerEmailRepository.show(email);

    if (!userSchema) {
      throw Error("User not found");
    }

    myEmitter.emit("user/sendEmail-verify", userSchema.email, userSchema.id);

    return;
  }
}
