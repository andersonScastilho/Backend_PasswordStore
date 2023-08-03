import { prismaClient } from "database/prisma-client";
import { UserSchema } from "models/user-schema";
import {
  UpdateUserParams,
  UpdateUserRepository,
} from "repositories/user/update-user-repository";

export class PostgresUpdateUserRepository implements UpdateUserRepository {
  async update({
    email,
    fullName,
    newPassword,

    userId,
  }: UpdateUserParams): Promise<UserSchema> {
    const user = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email,
        fullName: fullName,
        password_hash: newPassword,
      },
    });

    return user;
  }
}
