import { UserSchema } from "models/user-schema";
import { UpdateUserParams, UpdateUserRepository } from "repositories/user/update-user-repository";
export declare class PostgresUpdateUserRepository implements UpdateUserRepository {
    update({ email, fullName, newPassword, userId, }: UpdateUserParams): Promise<UserSchema>;
}
