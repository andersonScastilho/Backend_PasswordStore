import { UserSchema } from "models/user-schema";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
export declare class PostgresShowUserPerUserIdRepository implements ShowUserPerUserIdRepository {
    show(userId: string): Promise<UserSchema | null>;
}
