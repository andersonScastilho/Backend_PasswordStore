import { prismaClient } from "database/prisma-client";
import { InternalServerError } from "helpers/classes/InternalServerError";
import { DeleteStorageRepository } from "repositories/storage/delete-storage-repository";

export class PostgresDeleteStorageRepository
  implements DeleteStorageRepository
{
  async delete(storageId: string): Promise<void> {
    try {
      await prismaClient.storage.delete({
        where: {
          id: storageId,
        },
      });

      return;
    } catch (error) {
      throw new InternalServerError(
        "An unexpected error occurred, please try again later"
      );
    }
  }
}
