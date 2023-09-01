import { UserSchema } from "models/user-schema";
export interface UpdateUserParams {
    email?: string;
    fullName?: string;
    newPassword?: string;
    userId: string;
}
export interface UpdateUserRepository {
    update({ email, fullName, newPassword, userId, }: UpdateUserParams): Promise<UserSchema>;
}
