-- CreateTable
CREATE TABLE "ReadHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "novelId" INTEGER NOT NULL,
    "chapterId" INTEGER NOT NULL,

    CONSTRAINT "ReadHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReadHistory_userId_novelId_idx" ON "ReadHistory"("userId", "novelId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadHistory_userId_novelId_key" ON "ReadHistory"("userId", "novelId");

-- AddForeignKey
ALTER TABLE "ReadHistory" ADD CONSTRAINT "ReadHistory_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ReadHistory" ADD CONSTRAINT "ReadHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
