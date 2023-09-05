import { v4 as uuidv4 } from "uuid";

import { User } from "entities/User";
import { CreateUserRepository } from "repositories/user/create-user-repository";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

interface CreateUserRequest {
  userFullName: string;
  userEmail: string;
  userPassword: string;
}

type CreateUserResponse = User;

export class CreateUser {
  constructor(
    private createUserRepository: CreateUserRepository,
    private showUserperEmailRepository: ShowUserPerEmailRepository
  ) {}
  async execute({
    userEmail,
    userFullName,
    userPassword,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userExist = await this.showUserperEmailRepository.show(userEmail);

    if (userExist) {
      throw Error("Email in use");
    }

    const userId = uuidv4();

    const user = new User({
      userEmail,
      userFullName,
      userId,
      userPassword,
    });

    const hashPassword = await user.encryptedPassword(userPassword);
    user.hashPasswordToUserPassword = hashPassword;

    await this.createUserRepository.create(user);

    user.sendEmailToVerify();

    return user;
  }
}
