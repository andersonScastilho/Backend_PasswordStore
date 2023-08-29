import { Storage } from "entities/Storage";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";

export class ShowStorage {
  constructor(private showStorageRepository: ShowStorageRepository) {}
  async execute(storageId: string, userId: string) {
    const storage = await this.showStorageRepository.show(storageId, userId);

    if (!storage) {
      throw Error("Storage not found");
    }

    const instanceStorage = new Storage({
      account: storage.account,
      password: "",
      storageId: storage.id,
      usageLocation: storage.usageLocation,
      userId: storage.userId,
      description: storage.description || "",
      link: storage.link || "",
    });

    return instanceStorage;
  }
}
