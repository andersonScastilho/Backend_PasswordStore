import { Storage } from "entities/storage/Storage";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";

export class ShowStorage {
  constructor(private showStorageRepository: ShowStorageRepository) {}
  async execute(storageId: string, userId: string) {
    const storageSchema = await this.showStorageRepository.show(
      storageId,
      userId
    );

    if (!storageSchema) {
      throw Error("Storage not found");
    }

    const storage = new Storage({
      account: storageSchema.account,
      password: "",
      storageId: storageSchema.id,
      usageLocation: storageSchema.usageLocation,
      userId: storageSchema.userId,
      description: storageSchema.description,
      link: storageSchema.link,
    });

    return storage;
  }
}
