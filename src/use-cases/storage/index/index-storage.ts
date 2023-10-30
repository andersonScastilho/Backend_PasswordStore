import { Storage } from "entities/storage/Storage";
import { IndexStorageRepository } from "repositories/storage/index-storage-repository";

export class IndexStorage {
  constructor(private indexStorageRepository: IndexStorageRepository) {}

  async execute(userId: string): Promise<Storage[]> {
    const storageSchema = await this.indexStorageRepository.index(userId);

    const storages: Storage[] = [];

    storageSchema.forEach((storage) => {
      const storageInstace = new Storage({
        account: storage.account,
        password: "",
        storageId: storage.id,
        usageLocation: storage.usageLocation,
        userId: storage.userId,
        description: storage.description,
        link: storage.link,
      });

      storages.push(storageInstace);
    });

    return storages;
  }
}
