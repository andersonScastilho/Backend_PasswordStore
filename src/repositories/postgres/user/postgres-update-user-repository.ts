import { prismaClient } from "database/prisma-client";
import { User } from "entities/user/User";
import { UserSchema } from "models/user-schema";
import { UpdateUserRepository } from "repositories/user/update-user-repository";

export class PostgresUpdateUserRepository implements UpdateUserRepository {
  async update(user: User): Promise<UserSchema> {
    const userSchema = await prismaClient.user.update({
      where: {
        id: user.userId,
      },
      data: {
        email: user.userEmail,
        fullName: user.userFullName,
        password_hash: user.userPassword,
      },
    });

    return userSchema;
  }
}
