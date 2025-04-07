-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NovelCategory" (
    "id" SERIAL NOT NULL,
    "novelId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "NovelCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NovelCategory_novelId_categoryId_idx" ON "NovelCategory"("novelId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "NovelCategory_novelId_categoryId_key" ON "NovelCategory"("novelId", "categoryId");

-- AddForeignKey
ALTER TABLE "NovelCategory" ADD CONSTRAINT "NovelCategory_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelCategory" ADD CONSTRAINT "NovelCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
