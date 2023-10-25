import { User } from "entities/user/User";

import { prismaClient } from "database/prisma-client";

import { CreateUserRepository } from "repositories/user/create-user-repository";
import { BadRequest } from "helpers/classes/BadRequest";
import { InternalServerError } from "helpers/classes/InternalServerError";

export class PostgresCreateUserRepository implements CreateUserRepository {
  async create(user: User): Promise<void> {
    try {
      const { userEmail, userFullName, userPassword, userId } = user;

      const { email, fullName, verifiedEmail } = await prismaClient.user.create(
        {
          data: {
            email: userEmail,
            fullName: userFullName,
            id: userId,
            password_hash: userPassword,
          },
        }
      );

      if (!email && !fullName && !verifiedEmail) {
        throw new BadRequest(
          "Não foi possivel criar o usuario, tente novamente mais tarde"
        );
      }

      return;
    } catch (error) {
      throw new InternalServerError(
        "An unexpected error occurred, please try again later"
      );
    }
  }
}
