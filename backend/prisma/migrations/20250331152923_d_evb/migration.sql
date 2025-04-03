/*
  Warnings:

  - You are about to drop the column `srcUpdatedAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `Chapter` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_novelId_fkey";

-- DropIndex
DROP INDEX "Chapter_src_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "srcUpdatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "srcUpdated" TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "src",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(6);

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
