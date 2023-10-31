export type StorageType = {
  storageId: string;
  password: string;
  account: string;
  usageLocation: string;
  link: string | null;
  description: string | null;
  userId: string;
};

export type UpdateStorage = Partial<StorageType>;
