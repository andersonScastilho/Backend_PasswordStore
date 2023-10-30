import { Storage } from "entities/storage/Storage";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
import { UpdateStorageRepository } from "repositories/storage/update-storage-repository";
export interface UpdateStorageParams {
  account?: string;
  usageLocation?: string;
  description?: string;
  link?: string;
  storageId: string;
  userId: string;
  password?: string;
}
export class UpdateStorage {
  constructor(
    private updateStorageReposirory: UpdateStorageRepository,
    private showStorageRepository: ShowStorageRepository
  ) {}

  async execute({
    storageId,
    account,
    description,
    link,
    usageLocation,
    userId,
    password,
  }: UpdateStorageParams) {
    const storageSchema = await this.showStorageRepository.show(
      storageId,
      userId
    );

    if (!storageSchema) {
      throw Error("Storage not found");
    }

    const storage = new Storage({
      account: storageSchema.account,
      description: storageSchema.description,
      link: storageSchema.link,
      password: storageSchema.password,
      storageId: storageSchema.id,
      usageLocation: storageSchema.usageLocation,
      userId: storageSchema.userId,
    });

    storage.updateStorage({
      account,
      description,
      link,
      userId,
      storageId,
      password,
      usageLocation,
    });

    await this.updateStorageReposirory.update(storage);

    return storage;
  }
}
