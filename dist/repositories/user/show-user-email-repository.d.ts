import { UserSchema } from "models/user-schema";
export interface ShowUserPerEmailRepository {
    show(email: string): Promise<UserSchema | null>;
}
