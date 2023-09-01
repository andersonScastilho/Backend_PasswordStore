import { UserSchema } from "models/user-schema";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
export declare class PostgresShowUserPerEmailRepository implements ShowUserPerEmailRepository {
    show(email: string): Promise<UserSchema | null>;
}
