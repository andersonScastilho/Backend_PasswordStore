import { User } from "entities/User";
import { UserSchema } from "models/user-schema";
import { DeleteStorageRepository } from "repositories/storage/delete-storage-repository";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";

export class DeleteStorage {
  constructor(
    private deleteStorageRepository: DeleteStorageRepository,
    private showStorageRepository: ShowStorageRepository,
    private showUserPerUserIdRepository: ShowUserPerUserIdRepository
  ) {}
  async execute(storageId: string, userId: string, password: string) {
    const storageSchema = await this.showStorageRepository.show(
      storageId,
      userId
    );

    if (!storageSchema) {
      throw Error("Storage not found");
    }

    const userSchema = await this.showUserPerUserIdRepository.show(userId);

    if (!userSchema) {
      throw Error("User not found");
    }

    const user = new User({
      userEmail: userSchema.email,
      userFullName: userSchema.fullName,
      userId: userSchema.id,
      userPassword: userSchema.password_hash,
    });

    const isMatchPassword = user.comparePasswords(password);

    if (!isMatchPassword) {
      throw Error("Invalid password");
    }

    await this.deleteStorageRepository.delete(storageId);

    return;
  }
}
