import { prismaClient } from "database/prisma-client";
import { Storage } from "entities/Storage";
import { StorageSchema } from "models/storage-schema";
import { UpdateStorageRepository } from "repositories/storage/update-storage-repository";

export class PostgresUpdateStorageRepository
  implements UpdateStorageRepository
{
  async update(storage: Storage): Promise<StorageSchema> {
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
  }
}
