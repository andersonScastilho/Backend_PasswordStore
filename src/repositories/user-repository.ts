import { User } from "entities/User";

export interface UserRepository {
  create(user: User): Promise<User>;
  verifyUserExist(email: string): Promise<User | null>;
}
