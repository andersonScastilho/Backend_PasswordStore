import { User } from "entities/user/User";

export interface CreateUserRepository {
  create(user: User): Promise<void>;
}
