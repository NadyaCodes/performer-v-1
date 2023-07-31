-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "customProgramId" TEXT,
ALTER COLUMN "favProgramId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CustomProgram" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "school" TEXT,
    "city" TEXT,
    "province" TEXT,
    "country" TEXT,
    "website" TEXT,
    "typePt" BOOLEAN,
    "typeFt" BOOLEAN,
    "disciplineAct" BOOLEAN,
    "disciplineSing" BOOLEAN,
    "disciplineDance" BOOLEAN,
    "disciplineMT" BOOLEAN,

    CONSTRAINT "CustomProgram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_customProgramId_fkey" FOREIGN KEY ("customProgramId") REFERENCES "CustomProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
