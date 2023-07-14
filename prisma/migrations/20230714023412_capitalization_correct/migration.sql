/*
  Warnings:

  - You are about to drop the column `SchoolLocationId` on the `FTProgram` table. All the data in the column will be lost.
  - You are about to drop the column `Area` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `Province` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `SchoolLocationId` on the `PTProgram` table. All the data in the column will be lost.
  - Added the required column `schoolLocationId` to the `FTProgram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolLocationId` to the `PTProgram` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FTProgram" DROP CONSTRAINT "FTProgram_SchoolLocationId_fkey";

-- DropForeignKey
ALTER TABLE "PTProgram" DROP CONSTRAINT "PTProgram_SchoolLocationId_fkey";

-- AlterTable
ALTER TABLE "FTProgram" DROP COLUMN "SchoolLocationId",
ADD COLUMN     "schoolLocationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "Area",
DROP COLUMN "Province",
ADD COLUMN     "area" TEXT,
ADD COLUMN     "province" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PTProgram" DROP COLUMN "SchoolLocationId",
ADD COLUMN     "schoolLocationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PTProgram" ADD CONSTRAINT "PTProgram_schoolLocationId_fkey" FOREIGN KEY ("schoolLocationId") REFERENCES "SchoolLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FTProgram" ADD CONSTRAINT "FTProgram_schoolLocationId_fkey" FOREIGN KEY ("schoolLocationId") REFERENCES "SchoolLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
