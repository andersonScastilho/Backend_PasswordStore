import { User } from "entities/User";

export interface CreateUserRepository {
  create(user: User): Promise<void>;
}
