import { myEmitter } from "service/events/user-events";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
import Auth from "service/Auth";

export class VerifyEmail {
  constructor(private showUserPerEmailRepository: ShowUserPerEmailRepository) {}
  async execute(email: string) {
    const userSchema = await this.showUserPerEmailRepository.show(email);

    if (!userSchema) {
      throw Error("User not found");
    }

    const auth = new Auth();

    myEmitter.emit(
      "user/sendEmail-verify",
      auth,
      userSchema.email,
      userSchema.id
    );

    return;
  }
}
