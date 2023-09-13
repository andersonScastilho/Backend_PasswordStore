import { Storage } from "entities/Storage";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
import {
  UpdateStorageParams,
  UpdateStorageRepository,
} from "repositories/storage/update-storage-repository";
import { encrypt } from "utils/crypt";

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
    let passwordEncrypted;

    if (password) {
      const { iv, content, tag } = encrypt(password);
      const encryptedPassword = `${iv}:${content}:${tag}`;

      passwordEncrypted = encryptedPassword;
    }

    const updatedStorage = await this.updateStorageReposirory.update({
      storageId: storageId,
      account: account,
      userId: userId,
      description: description,
      link: link,
      usageLocation: usageLocation,
      password: password ? passwordEncrypted : undefined,
    });

    const storage = new Storage({
      account: updatedStorage.account,
      password: "",
      storageId: updatedStorage.id,
      usageLocation: updatedStorage.usageLocation,
      userId: updatedStorage.userId,
      description: updatedStorage.description,
      link: updatedStorage.link,
    });

    return storage;
  }
}
