import { v4 as uuidv4 } from "uuid";
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

    const userId = uuidv4();

    const user = new User({
      userEmail,
      userFullName,
      userPassword,
      userId,
    });

    await this.userRepository.create(user);

    return user;
  }
}
