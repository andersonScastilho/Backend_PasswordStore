import { User } from "entities/User";
import { UserRepository } from "repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
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
