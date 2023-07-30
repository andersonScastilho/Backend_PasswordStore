-- CreateTable
CREATE TABLE "storages" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "usageLocation" TEXT NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "storages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "storages_id_key" ON "storages"("id");

-- AddForeignKey
ALTER TABLE "storages" ADD CONSTRAINT "storages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
