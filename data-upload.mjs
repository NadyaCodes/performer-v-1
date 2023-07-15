import pkg from "@prisma/client";
const { School } = pkg;
const { Location } = pkg;
const { SchoolLocation } = pkg;
const { PTProgram } = pkg;
const { FTProgram } = pkg;

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

import allSchools from "./src/data/allSchools.json" assert { type: "json" };
import allCities from "./src/data/allCities.json" assert { type: "json" };
import allSchoolsLocations from "./src/data/allSchoolsLocations.json" assert { type: "json" };
import allPTPrograms from "./src/data/allPtPrograms.json" assert { type: "json" };
import allFTPrograms from "./src/data/allFtPrograms.json" assert { type: "json" };

try {
  ///////////////import Schools////////////
  const allSchoolValues = Object.values(allSchools);
  // const allSchoolsNoIds = allSchoolValues.map((school) => {
  //   return { name: school.name };
  // });
  // const createMany = await prisma.school.createMany({
  //   data: allSchoolsNoIds,
  //   skipDuplicates: true,
  // });
  ///////////////import Cities////////////
  const allCityValues = Object.values(allCities);
  // const allCitiesNoIds = allCityValues.map((city) => {
  //   return { city: city.city, province: city.province, area: city.area };
  // });
  // const createMany = await prisma.location.createMany({
  //   data: allCitiesNoIds,
  //   skipDuplicates: true,
  // });

  ///////////////import Schools Locations////////////

  const allSchoolsLocationsValues = Object.values(allSchoolsLocations);
  // const createSchoolsData = async () => {
  //   const dataArray = [];
  //   for (const value of allSchoolsLocationsValues) {
  //     const school = allSchoolValues.find(
  //       (school) => school.id === value?.school_id
  //     );
  //     const city = allCityValues.find((city) => city.id === value?.location_id);

  //     const prismaSchool = await prisma.school.findFirst({
  //       where: {
  //         name: {
  //           equals: school?.name,
  //         },
  //       },
  //     });

  //     const prismaCity = await prisma.location.findFirst({
  //       where: {
  //         city: {
  //           equals: city?.city,
  //         },
  //         province: {
  //           equals: city?.province,
  //         },
  //       },
  //     });

  //     const schoolLocationObject = {
  //       schoolId: prismaSchool?.id || "SCHOOL ID MISSING",
  //       locationId: prismaCity?.id || "LOCATION ID MISSING",
  //       website: school?.site || "WEBSITE MISSING",
  //     };

  //     // Check if the object already exists in the array
  //     const existingObject = dataArray.find((obj) => {
  //       return (
  //         obj.schoolId === schoolLocationObject.schoolId &&
  //         obj.locationId === schoolLocationObject.locationId &&
  //         obj.website === schoolLocationObject.website
  //       );
  //     });

  //     if (!existingObject) {
  //       console.log(schoolLocationObject);
  //       dataArray.push(schoolLocationObject);
  //     }
  //   }

  //   return dataArray;
  // };

  // const schoolLocationDataArray = await createSchoolsData();

  // const createMany = await prisma.schoolLocation.createMany({
  //   data: schoolLocationDataArray,
  //   skipDuplicates: true,
  // });

  // const deleteMany = await prisma.schoolLocation.deleteMany({
  //   where: {
  //     website: {
  //       contains: "https://concordia.ab.ca",
  //     },
  //   },
  // });
  // const deleteAll = await prisma.schoolLocation.deleteMany();

  ///////////////Fix Montreal vs. Montréal////////////

  //Montréal prisma id: clk1z32qr001xuld1aiig1hi1
  //Montreal prisma id: clk1z32qr0019uld1yjya4pz6

  // const montrealSchoolLocations = await prisma.schoolLocation.findMany({
  //   where: {
  //     locationId: {
  //       equals: "clk1z32qr0019uld1yjya4pz6",
  //     },
  //   },
  // });

  // const updateMontreal = await prisma.schoolLocation.updateMany({
  //   where: {
  //     locationId: {
  //       equals: "clk1z32qr0019uld1yjya4pz6",
  //     },
  //   },
  //   data: {
  //     locationId: "clk1z32qr001xuld1aiig1hi1",
  //   },
  // });

  // console.log(montrealSchoolLocations);

  // const deleteMontreal = await prisma.location.delete({
  //   where: {
  //     id: "clk1z32qr0019uld1yjya4pz6",
  //   },
  // });

  ///////////////import PT Programs////////////
  // const allPTProgramValues = Object.values(allPTPrograms);

  // const createPTSchoolsData = async () => {
  //   const dataArray = [];
  //   for (const value of allPTProgramValues) {
  //     const schoolLoc = allSchoolsLocationsValues.find(
  //       (schoolLoc) => schoolLoc.id === value?.school_location_id
  //     );
  //     const schoolID = schoolLoc?.school_id;
  //     const schoolObj = allSchoolValues.find((school) => school.id == schoolID);

  //     const prismaSchool = await prisma.school.findFirst({
  //       where: {
  //         name: {
  //           equals: schoolObj?.name,
  //         },
  //       },
  //     });

  //     const locID = schoolLoc?.location_id;
  //     const locationObj = allCityValues.find((city) => city.id === locID);

  //     const prismaCity = await prisma.location.findFirst({
  //       where: {
  //         city: {
  //           equals: locationObj?.city,
  //         },
  //         province: {
  //           equals: locationObj?.province,
  //         },
  //       },
  //     });

  //     const schoolLocation = await prisma.schoolLocation.findFirst({
  //       where: {
  //         schoolId: {
  //           equals: prismaSchool?.id,
  //         },
  //         locationId: {
  //           equals: prismaCity?.id,
  //         },
  //       },
  //     });

  //     const PTProgramObj = {
  //       schoolLocationId: schoolLocation?.id || "SCHOOL LOCATION ID MISSING",
  //       website: value.site || "WEBSITE MISSING",
  //       discipline: value.type || "DISCIPLINE MISSING",
  //     };
  //     console.log(PTProgramObj);
  //     dataArray.push(PTProgramObj);
  //   }

  //   return dataArray;
  // };

  // const PTProgramDataArray = await createPTSchoolsData();

  // const createMany = await prisma.pTProgram.createMany({
  //   data: PTProgramDataArray,
  //   skipDuplicates: true,
  // });

  // const deleteAll = await prisma.pTProgram.deleteMany();

  ///////////////import FT Programs////////////

  const allFTProgramValues = Object.values(allFTPrograms);

  // const createPTSchoolsData = async () => {
  //   const dataArray = [];
  //   for (const value of allFTProgramValues) {
  //     const schoolLoc = allSchoolsLocationsValues.find(
  //       (schoolLoc) => schoolLoc.id === value?.school_location_id
  //     );
  //     const schoolID = schoolLoc?.school_id;
  //     const schoolObj = allSchoolValues.find((school) => school.id == schoolID);

  //     const prismaSchool = await prisma.school.findFirst({
  //       where: {
  //         name: {
  //           equals: schoolObj?.name,
  //         },
  //       },
  //     });

  //     const locID = schoolLoc?.location_id;
  //     const locationObj = allCityValues.find((city) => city.id === locID);

  //     const prismaCity = await prisma.location.findFirst({
  //       where: {
  //         city: {
  //           equals: locationObj?.city,
  //         },
  //         province: {
  //           equals: locationObj?.province,
  //         },
  //       },
  //     });

  //     const schoolLocation = await prisma.schoolLocation.findFirst({
  //       where: {
  //         schoolId: {
  //           equals: prismaSchool?.id,
  //         },
  //         locationId: {
  //           equals: prismaCity?.id,
  //         },
  //       },
  //     });

  //     const FTProgramObj = {
  //       schoolLocationId: schoolLocation?.id || "SCHOOL LOCATION ID MISSING",
  //       website: value.site || "WEBSITE MISSING",
  //       discipline: value.type || "DISCIPLINE MISSING",
  //       name: value.program,
  //     };
  //     console.log(FTProgramObj);
  //     dataArray.push(FTProgramObj);
  //   }

  //   return dataArray;
  // };

  // const FTProgramDataArray = await createPTSchoolsData();

  // const createMany = await prisma.fTProgram.createMany({
  //   data: FTProgramDataArray,
  //   skipDuplicates: true,
  // });
} catch (error) {
  console.error("Error reading JSON file:", error);
}
