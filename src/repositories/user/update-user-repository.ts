import { User } from "entities/user/User";
import { UserSchema } from "models/user-schema";

export interface UpdateUserRepository {
  update(user: User): Promise<UserSchema>;
}
