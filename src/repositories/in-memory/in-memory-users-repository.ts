import { User } from "entities/User";
import { UserRepository } from "repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
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
