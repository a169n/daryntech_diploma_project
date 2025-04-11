-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
