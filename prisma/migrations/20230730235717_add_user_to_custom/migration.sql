/*
  Warnings:

  - Added the required column `userId` to the `CustomProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomProgram" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CustomProgram" ADD CONSTRAINT "CustomProgram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
