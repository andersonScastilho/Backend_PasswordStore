export interface DeleteRefreshTokenRepository {
  delete(userId: string): Promise<void>;
}
