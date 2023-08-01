import { prismaClient } from "database/prisma-client";
import { DeleteStorageRepository } from "repositories/storage/delete-storage-repository";

export class PostgresDeleteStorageRepository
  implements DeleteStorageRepository
{
  async delete(storageId: string): Promise<void> {
    await prismaClient.storage.delete({
      where: {
        id: storageId,
      },
    });

    return;
  }
}
