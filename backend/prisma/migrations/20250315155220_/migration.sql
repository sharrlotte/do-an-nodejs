/*
  Warnings:

  - A unique constraint covering the columns `[src]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chapter_src_key" ON "Chapter"("src");
