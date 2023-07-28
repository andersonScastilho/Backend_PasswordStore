import { User } from "entities/User";
import { UserRepository } from "repositories/user-repository";

interface CreateUserRequest {
  userFullName: string;
  userEmail: string;
  userPassword: string;
}

type CreateUserResponse = User;

export class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async execute({
    userEmail,
    userFullName,
    userPassword,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userExist = await this.userRepository.verifyUserExist(userEmail);

    if (userExist) {
      throw Error("Email in use");
    }

    const user = new User({
      userEmail,
      userFullName,
      userPassword,
    });

    await this.userRepository.create(user);

    return user;
  }
}
