-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "followCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "BookLibrary" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "novelId" INTEGER NOT NULL,

    CONSTRAINT "BookLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "chapterId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookLibrary_userId_novelId_idx" ON "BookLibrary"("userId", "novelId");

-- CreateIndex
CREATE UNIQUE INDEX "BookLibrary_userId_novelId_key" ON "BookLibrary"("userId", "novelId");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Comment_chapterId_idx" ON "Comment"("chapterId");
