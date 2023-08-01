import { Storage } from "entities/Storage";
import { IndexStorageRepository } from "repositories/storage/index-storage-repository";

export class IndexStorage {
  constructor(private indexStorageRepository: IndexStorageRepository) {}

  async execute(userId: string): Promise<Storage[]> {
    const dataStoraged = await this.indexStorageRepository.index(userId);

    const storages: Storage[] = [];

    dataStoraged.forEach((storage) => {
      const storageInstace = new Storage({
        account: storage.account,
        password: storage.password,
        storageId: storage.id,
        usageLocation: storage.usageLocation,
        userId: storage.userId,
        description: storage.description || undefined,
        link: storage.link || undefined,
      });

      storages.push(storageInstace);
    });

    return storages;
  }
}
