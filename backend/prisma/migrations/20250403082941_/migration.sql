/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookLibrary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookLibrary" DROP CONSTRAINT "BookLibrary_novelId_fkey";

-- DropForeignKey
ALTER TABLE "BookLibrary" DROP CONSTRAINT "BookLibrary_userId_fkey";

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_novelId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_novelId_fkey";

-- DropForeignKey
ALTER TABLE "ReadHistory" DROP CONSTRAINT "ReadHistory_novelId_fkey";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "BookLibrary";

-- CreateTable
CREATE TABLE "NovelLibrary" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "novelId" INTEGER NOT NULL,

    CONSTRAINT "NovelLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Novel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "srcUpdated" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "followCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Novel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NovelLibrary_userId_novelId_idx" ON "NovelLibrary"("userId", "novelId");

-- CreateIndex
CREATE UNIQUE INDEX "NovelLibrary_userId_novelId_key" ON "NovelLibrary"("userId", "novelId");

-- CreateIndex
CREATE UNIQUE INDEX "Novel_src_key" ON "Novel"("src");

-- AddForeignKey
ALTER TABLE "NovelLibrary" ADD CONSTRAINT "NovelLibrary_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NovelLibrary" ADD CONSTRAINT "NovelLibrary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ReadHistory" ADD CONSTRAINT "ReadHistory_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
