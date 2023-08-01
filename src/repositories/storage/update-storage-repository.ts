import { StorageSchema } from "models/storage-schema";

export interface UpdateStorageParams {
  account?: string;
  usageLocation?: string;
  description?: string;
  link?: string;
  storageId: string;
  userId: string;
}

export interface UpdateStorageRepository {
  update({
    account,
    description,
    link,
    usageLocation,
    storageId,
  }: UpdateStorageParams): Promise<StorageSchema>;
}
