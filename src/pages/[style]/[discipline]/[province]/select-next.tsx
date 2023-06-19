import { type NextPage, GetStaticProps } from "next";
import Link from "next/link";
import Picker from "@component/pages/Picker";
import {
  PathsArray,
  DisciplineProps,
  ProgramDataProp,
} from "@component/data/types";
import {
  styles,
  disciplines,
  provinces,
  provincesFull,
  provincesFullReverse,
} from "@component/data/constants";
import allCities from "src/data/allCities.json";
import allSchoolsLocations from "src/data/allSchoolsLocations.json";
import allPtPrograms from "src/data/allPtPrograms.json";
import allFtPrograms from "src/data/allFtPrograms.json";
import {
  // PathsArray,
  // DisciplineProps,
  AllSchoolsLocations,
  AllCities,
} from "@component/data/types";

const DisciplinePage: NextPage<DisciplineProps> = ({
  style,
  discipline,
  province,
  citiesList,
}) => {
  const link = `/${style}/${discipline}/${province}`;
  const backLink = `/${style}/${discipline}/select-next`;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Which City?
      </h1>
      <div
        style={{
          display: "flex",
          margin: "2rem",
        }}
        className="rounded border-2 border-green-300"
      >
        <Picker
          buttonOptions={
            citiesList || ["There are no applicable programs in this category"]
          }
          currentLink={link}
          last={true}
        />
      </div>
      <Link href={backLink} className="p-2">
        <button className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white">
          Back
        </button>
      </Link>
    </div>
  );
};

const createPaths = (): Array<PathsArray> => {
  const finalArray: Array<PathsArray> = [];

  styles.forEach((style) => {
    disciplines.forEach((discipline) => {
      let allProgramsInType;

      if (style === "pt") {
        allProgramsInType = Object.values(allPtPrograms).filter(
          (element) => element.type === discipline
        );
      }

      if (style === "ft") {
        allProgramsInType = Object.values(allFtPrograms).filter(
          (element) => element.type === discipline
        );
      }
      const allSchoolsLocations: AllSchoolsLocations = require("src/data/allSchoolsLocations.json");
      const allCities: AllCities = require("src/data/allCities.json");

      const schoolLocationOptions = allProgramsInType?.map(
        (schoolLoc) => schoolLoc.school_location_id
      );
      const allLocationIds = schoolLocationOptions?.map(
        (location) => allSchoolsLocations[location]?.location_id!
      );

      const provincesWithSchools: string[] = [];

      allLocationIds?.forEach((loc) => {
        let locationProvince = allCities[loc]?.province ?? null;
        if (locationProvince) {
          locationProvince = provincesFullReverse[locationProvince] || null;
        }
        if (
          locationProvince !== null &&
          !provincesWithSchools.includes(locationProvince)
        ) {
          provincesWithSchools.push(locationProvince);
        }
      });
      provincesWithSchools.forEach((province) => {
        finalArray.push({
          params: {
            style: style,
            discipline: discipline,
            province: province,
          },
        });
      });
    });
  });
  return finalArray;
};

export async function getStaticPaths() {
  const paths = createPaths();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { style, discipline, province } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as DisciplineProps;
  const allSchoolsLocations: AllSchoolsLocations = require("src/data/allSchoolsLocations.json");
  const allCities: AllCities = require("src/data/allCities.json");
  const citiesInProvince = Object.values(allCities).filter(
    (element) => element.province === provincesFull[province || "na"]
  );
  // .map((element) => element.city);

  const cityIDsInProvince = citiesInProvince.map((element) => element.id);

  const schoolsInProvince: ProgramDataProp[] = [];

  Object.values(allSchoolsLocations).forEach((schoolLoc) => {
    // console.log(schoolLoc);
    if (cityIDsInProvince.includes(schoolLoc.location_id)) {
      // schoolsInProvince.push(schoolLoc.id)
      let currentSchool = null;
      if (style === "pt") {
        currentSchool = Object.values(allPtPrograms).find(
          (element) => element.school_location_id === schoolLoc.id
        );
      }

      if (style === "ft") {
        currentSchool = Object.values(allFtPrograms).find(
          (element) => element.school_location_id === schoolLoc.id
        );
      }
      if (currentSchool) {
        schoolsInProvince.push(currentSchool);
      }
    }
  });
  console.log(schoolsInProvince.length);

  const localSchoolIDsInDiscipline = schoolsInProvince
    .filter((element) => element.type === discipline)
    .map((element) => element.school_location_id);

  console.log(localSchoolIDsInDiscipline);

  const locationIds = localSchoolIDsInDiscipline.map(
    (schoolLocId) => allSchoolsLocations[schoolLocId]?.location_id
  );
  console.log(locationIds);

  const citiesList: string[] = [];

  locationIds.forEach((locId) => {
    if (!citiesList.includes(allCities[locId].city)) {
      citiesList.push(allCities[locId].city);
    }
  });

  const citiesDisplay = citiesInProvince.map((element) => element.city);

  return {
    props: {
      style,
      discipline,
      province,
      citiesList: citiesList,
    },
  };
};

export default DisciplinePage;
