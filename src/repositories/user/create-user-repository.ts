import { User } from "entities/User";

export interface CreateUserRepository {
  create(user: User): Promise<User>;
  verifyUserExist(email: string): Promise<User | null>;
}
