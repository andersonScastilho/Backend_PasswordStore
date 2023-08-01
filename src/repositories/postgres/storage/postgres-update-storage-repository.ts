import { prismaClient } from "database/prisma-client";
import { StorageSchema } from "models/storage-schema";
import {
  UpdateStorageParams,
  UpdateStorageRepository,
} from "repositories/storage/update-storage-repository";

export class PostgresUpdateStorageRepository
  implements UpdateStorageRepository
{
  async update({
    account,
    description,
    link,
    usageLocation,
    storageId,
    password,
  }: UpdateStorageParams): Promise<StorageSchema> {
    const storage = await prismaClient.storage.update({
      where: {
        id: storageId,
      },
      data: {
        account: account,
        description: description,
        link: link,
        usageLocation: usageLocation,
        password: password,
      },
    });
    return storage;
  }
}
