-- CreateTable
CREATE TABLE "FavProgram" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ftProgramId" TEXT,
    "ptProgramId" TEXT,

    CONSTRAINT "FavProgram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavProgram" ADD CONSTRAINT "FavProgram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavProgram" ADD CONSTRAINT "FavProgram_ftProgramId_fkey" FOREIGN KEY ("ftProgramId") REFERENCES "FTProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavProgram" ADD CONSTRAINT "FavProgram_ptProgramId_fkey" FOREIGN KEY ("ptProgramId") REFERENCES "PTProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
