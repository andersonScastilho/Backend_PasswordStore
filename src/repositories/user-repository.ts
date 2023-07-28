import { User } from "entities/User";

export interface UserRepository {
  create(user: User): Promise<void>;
  verifyUserExist(email: string): Promise<User | null>;
}
