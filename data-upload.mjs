import pkg from "@prisma/client";
const { School } = pkg;
const { Location } = pkg;
const { SchoolLocation } = pkg;

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

import allSchools from "./src/data/allSchools.json" assert { type: "json" };
import allCities from "./src/data/allCities.json" assert { type: "json" };
import allSchoolsLocations from "./src/data/allSchoolsLocations.json" assert { type: "json" };

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

  // const allSchoolsLocationsValues = Object.values(allSchoolsLocations);
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
  ///////////////import PT Programs////////////
  ///////////////import FT Programs////////////
} catch (error) {
  console.error("Error reading JSON file:", error);
}
