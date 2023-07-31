import { User } from "entities/User";
import { UserSchema } from "models/user-schema";

export interface CreateUserRepository {
  create(user: User): Promise<UserSchema>;
}
