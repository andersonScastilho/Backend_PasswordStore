import { prismaClient } from "database/prisma-client";
import { Storage } from "entities/storage/Storage";
import { InternalServerError } from "helpers/classes/InternalServerError";
import { StorageSchema } from "models/storage-schema";
import { UpdateStorageRepository } from "repositories/storage/update-storage-repository";

export class PostgresUpdateStorageRepository
  implements UpdateStorageRepository
{
  async update(storage: Storage): Promise<StorageSchema> {
    try {
      const storageSchema = await prismaClient.storage.update({
        where: {
          id: storage.storageId,
        },
        data: {
          account: storage.account,
          description: storage.description,
          link: storage.link,
          usageLocation: storage.usageLocation,
          password: storage.password,
        },
      });
      return storageSchema;
    } catch (error) {
      throw new InternalServerError(
        "An unexpected error occurred, please try again later"
      );
    }
  }
}
