import { UserSchema } from "models/user-schema";

export interface ShowUserPeruserIdRepository {
  show(userId: string): Promise<UserSchema | null>;
}
