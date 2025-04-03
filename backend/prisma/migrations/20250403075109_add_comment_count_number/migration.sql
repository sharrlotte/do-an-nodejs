-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentId" INTEGER;

-- CreateIndex
CREATE INDEX "Comment_novelId_idx" ON "Comment"("novelId");
