import { User } from "entities/User";
import { CreateUserRepository } from "repositories/user/create-user-repository";

export class InMemoryUserRepository implements CreateUserRepository {
  public items: User[] = [];

  async create(user: User): Promise<User> {
    this.items.push(user);

    return user;
  }

  async verifyUserExist(userEmail: string): Promise<User | null> {
    const user = this.items.find((user) => {
      return user.userEmail === userEmail;
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
