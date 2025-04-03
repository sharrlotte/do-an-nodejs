-- AddForeignKey
ALTER TABLE "BookLibrary" ADD CONSTRAINT "BookLibrary_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookLibrary" ADD CONSTRAINT "BookLibrary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
