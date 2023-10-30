import { prismaClient } from "database/prisma-client";
import { InternalServerError } from "helpers/classes/InternalServerError";
import { StorageSchema } from "models/storage-schema";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";

export class PostgresShowStorageRepository implements ShowStorageRepository {
  async show(storageId: string, userId: string): Promise<StorageSchema | null> {
    try {
      const storage = await prismaClient.storage.findFirst({
        where: {
          AND: {
            id: storageId,
            userId: userId,
          },
        },
      });

      return storage;
    } catch (error) {
      throw new InternalServerError(
        "An unexpected error occurred, please try again later"
      );
    }
  }
}
