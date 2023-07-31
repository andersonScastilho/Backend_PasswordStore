import { UserSchema } from "models/user-schema";

export interface ShowUserRepository {
  show(email: string): Promise<UserSchema | null>;
}
