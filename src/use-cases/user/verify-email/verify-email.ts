import { User } from "entities/User";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

export class VerifyEmail {
  constructor(private showUserPerEmailRepository: ShowUserPerEmailRepository) {}
  async execute(email: string) {
    const userSchema = await this.showUserPerEmailRepository.show(email);

    if (!userSchema) {
      throw Error("User not found");
    }

    const user = new User({
      userEmail: userSchema.email,
      userFullName: userSchema.fullName,
      userId: userSchema.id,
      userPassword: "",
    });

    await user.sendEmailToVerify();

    return;
  }
}
