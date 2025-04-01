/*
  Warnings:

  - A unique constraint covering the columns `[src]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `src` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "src" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_src_key" ON "Chapter"("src");
