import { prismaClient } from "database/prisma-client";
import { Storage } from "entities/Storage";
import { StorageRepository } from "repositories/storage-repository";

export class PostgresStorageRepository implements StorageRepository {
  async create(storage: Storage): Promise<Storage> {
    const {
      account,
      description,
      link,
      password,
      usageLocation,
      userId,
      storageId,
    } = storage;

    const createdStorage = await prismaClient.storage.create({
      data: {
        account,
        id: storageId,
        password,
        usageLocation,
        description,
        link,
        userId,
      },
    });

    if (!createdStorage) {
      throw Error("Não foi possivel armazenar os dados");
    }

    return storage;
  }
}
