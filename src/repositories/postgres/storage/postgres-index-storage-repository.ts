import { prismaClient } from "database/prisma-client";
import { InternalServerError } from "helpers/classes/InternalServerError";
import { StorageSchema } from "models/storage-schema";
import { IndexStorageRepository } from "repositories/storage/index-storage-repository";

export class PostgresIndexStorageRepository implements IndexStorageRepository {
  async index(userId: string): Promise<StorageSchema[]> {
    try {
      const storage = await prismaClient.storage.findMany({
        where: { userId },
      });

      return storage;
    } catch (error) {
      throw new InternalServerError(
        "An unexpected error occurred, please try again later"
      );
    }
  }
}
