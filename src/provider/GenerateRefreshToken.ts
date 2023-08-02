import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { prismaClient } from "database/prisma-client";

export class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, "second").unix();
    const uuid = uuidv4();

    const generateRefreshToken = await prismaClient.refresh_Token.create({
      data: {
        id: uuid,
        userId,
        expiresIn,
      },
    });
    return generateRefreshToken;
  }
}
