import { User } from "entities/User";

export interface ShowUserRepository {
  show(email: string): Promise<User | null>;
}
