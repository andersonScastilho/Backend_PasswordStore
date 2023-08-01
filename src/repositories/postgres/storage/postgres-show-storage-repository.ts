import { prismaClient } from "database/prisma-client";
import { StorageSchema } from "models/storage-schema";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";

export class PostgresShowStorageRepository implements ShowStorageRepository {
  async show(storageId: string, userId: string): Promise<StorageSchema | null> {
    const storage = await prismaClient.storage.findFirst({
      where: {
        AND: {
          id: storageId,
          userId: userId,
        },
      },
    });

    return storage;
  }
}
