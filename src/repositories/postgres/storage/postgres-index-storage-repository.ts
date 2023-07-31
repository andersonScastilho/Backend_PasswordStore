import { prismaClient } from "database/prisma-client";
import { IndexStorageRepository } from "repositories/storage/index-storage-repository";

export class PostgresIndexStorageRepository implements IndexStorageRepository {
  async index(userId: string) {
    const storage = await prismaClient.storage.findMany({
      where: { userId },
    });

    return storage;
  }
}
