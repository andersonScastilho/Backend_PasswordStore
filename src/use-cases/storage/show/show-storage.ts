import { ShowStorageRepository } from "repositories/storage/show-storage-repository";

export class ShowStorage {
  constructor(private showStorageRepository: ShowStorageRepository) {}
  async execute(storageId: string, userId: string) {
    const storage = await this.showStorageRepository.show(storageId, userId);

    if (!storage) {
      throw Error("Storage not found");
    }

    return storage;
  }
}
