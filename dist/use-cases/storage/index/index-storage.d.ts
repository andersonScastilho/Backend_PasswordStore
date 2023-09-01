import { Storage } from "entities/Storage";
import { IndexStorageRepository } from "repositories/storage/index-storage-repository";
export declare class IndexStorage {
    private indexStorageRepository;
    constructor(indexStorageRepository: IndexStorageRepository);
    execute(userId: string): Promise<Storage[]>;
}
