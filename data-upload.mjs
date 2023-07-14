import pkg from "@prisma/client";
const { School } = pkg;
const { Location } = pkg;

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

import allSchools from "./src/data/allSchools.json" assert { type: "json" };
import allCities from "./src/data/allCities.json" assert { type: "json" };

try {
  ///////////////import Schools////////////
  // const allSchoolValues = Object.values(allSchools);
  // const allSchoolsNoIds = allSchoolValues.map((school) => {
  //   return { name: school.name };
  // });
  // const createMany = await prisma.school.createMany({
  //   data: allSchoolsNoIds,
  //   skipDuplicates: true,
  // });
  ///////////////import Cities////////////
  const allCityValues = Object.values(allCities);
  const allCitiesNoIds = allCityValues.map((city) => {
    return { city: city.city, province: city.province, area: city.area };
  });
  const createMany = await prisma.location.createMany({
    data: allCitiesNoIds,
    skipDuplicates: true,
  });
} catch (error) {
  console.error("Error reading JSON file:", error);
}
