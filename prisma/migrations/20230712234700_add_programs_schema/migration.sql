-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "Province" TEXT NOT NULL,
    "Area" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolLocation" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "SchoolLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PTProgram" (
    "id" TEXT NOT NULL,
    "SchoolLocationId" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,

    CONSTRAINT "PTProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FTProgram" (
    "id" TEXT NOT NULL,
    "SchoolLocationId" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FTProgram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SchoolLocation" ADD CONSTRAINT "SchoolLocation_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolLocation" ADD CONSTRAINT "SchoolLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PTProgram" ADD CONSTRAINT "PTProgram_SchoolLocationId_fkey" FOREIGN KEY ("SchoolLocationId") REFERENCES "SchoolLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FTProgram" ADD CONSTRAINT "FTProgram_SchoolLocationId_fkey" FOREIGN KEY ("SchoolLocationId") REFERENCES "SchoolLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
