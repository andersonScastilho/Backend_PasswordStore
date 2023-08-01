import { DeleteStorageRepository } from "repositories/storage/delete-storage-repository";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";

export class DeleteStorage {
  constructor(
    private deleteStorageRepository: DeleteStorageRepository,
    private showStorageRepository: ShowStorageRepository
  ) {}
  async execute(storageId: string, userId: string) {
    const storage = await this.showStorageRepository.show(storageId, userId);

    if (!storage) {
      throw Error("Storage not found");
    }

    await this.deleteStorageRepository.delete(storageId);

    return;
  }
}
