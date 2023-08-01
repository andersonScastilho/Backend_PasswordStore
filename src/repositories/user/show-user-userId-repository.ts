import { UserSchema } from "models/user-schema";

export interface ShowUserPerUserIdRepository {
  show(userId: string): Promise<UserSchema | null>;
}
