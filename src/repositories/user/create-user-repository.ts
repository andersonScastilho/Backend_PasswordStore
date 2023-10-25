import { User } from "entities/user/User";
import { UserTypeReturn } from "entities/user/userTypes";

export interface CreateUserRepository {
  create(user: User): Promise<void>;
}
