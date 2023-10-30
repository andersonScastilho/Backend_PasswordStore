import { prismaClient } from "database/prisma-client";
import { Storage } from "entities/storage/Storage";
import { BadRequest } from "helpers/classes/BadRequest";
import { InternalServerError } from "helpers/classes/InternalServerError";
import { StorageSchema } from "models/storage-schema";
import { CreateStorageRepository } from "repositories/storage/create-storage-repository";

export class PostgresStorageRepository implements CreateStorageRepository {
  async create(storage: Storage): Promise<StorageSchema> {
    try {
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
        throw new BadRequest("Não foi possivel armazenar os dados");
      }

      return createdStorage;
    } catch (error) {
      throw new InternalServerError(
        "An unexpected error occurred, please try again later"
      );
    }
  }
}
