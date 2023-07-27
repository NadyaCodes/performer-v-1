import { type NextPage, GetStaticProps } from "next";
import Link from "next/link";
import Picker from "@component/components/ProgramDisplay/Picker";
import { disciplines, provincesFullReverse } from "@component/data/constants";
import {
  PathsArray,
  DisciplineProps,
  AllSchoolsLocations,
  AllCities,
} from "@component/data/types";
import { styles } from "@component/data/constants";
import allPtPrograms from "src/data/allPtPrograms.json";
import allFtPrograms from "src/data/allFtPrograms.json";
// import allCities from "src/data/allCities.json";
// import allSchoolsLocations from "src/data/allSchoolsLocations.json";

const DisciplinePage: NextPage<DisciplineProps> = ({
  style,
  discipline,
  allProgramsInType,
}) => {
  const link = `/${style}/${discipline}`;
  const backLink = `/${style}/select-next`;

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Which Province?
      </h1>
      <div
        style={{
          display: "flex",
          margin: "2rem",
        }}
        className="rounded border-2 border-green-300"
      >
        <Picker
          buttonOptions={provincesWithSchools}
          currentLink={link}
          last={false}
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
      // let allProgramsInType = [
      //   { id: "", school_location_id: "", site: "", type: "", style: "" },
      // ];

      // if (style === "pt") {
      //   allProgramsInType = Object.values(allPtPrograms).filter(
      //     (element) => element.type === discipline
      //   );
      // }

      // if (style === "ft") {
      //   allProgramsInType = Object.values(allFtPrograms).filter(
      //     (element) => element.type === discipline
      //   );
      // }
      finalArray.push({
        params: {
          style: style,
          discipline: discipline,
          // allProgramsInType: allProgramsInType,
        },
      });
    });
  });
  console.log(finalArray);
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
  // const { style, discipline } = params as DisciplineProps;
  const { style, discipline } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as DisciplineProps;

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

  return {
    props: {
      style,
      discipline,
      allProgramsInType,
    },
  };
};

export default DisciplinePage;
