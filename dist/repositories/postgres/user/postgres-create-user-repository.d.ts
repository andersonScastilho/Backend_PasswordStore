import { User } from "entities/User";
import { CreateUserRepository } from "repositories/user/create-user-repository";
import { UserSchema } from "models/user-schema";
export declare class PostgresCreateUserRepository implements CreateUserRepository {
    create(user: User): Promise<UserSchema>;
}
