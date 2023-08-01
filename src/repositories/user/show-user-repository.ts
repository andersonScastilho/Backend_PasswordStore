import { UserSchema } from "models/user-schema";

export interface ShowUserParams {
  email?: string;
  userId?: string;
}
export interface ShowUserRepository {
  show({ email, userId }: ShowUserParams): Promise<UserSchema | null>;
}
