import { prismaClient } from "database/prisma-client";
import { StorageSchema } from "models/storage-schema";
import { IndexStorageRepository } from "repositories/storage/index-storage-repository";

export class PostgresIndexStorageRepository implements IndexStorageRepository {
  async index(userId: string): Promise<StorageSchema[]> {
    const storage = await prismaClient.storage.findMany({
      where: { userId },
    });

    return storage;
  }
}
