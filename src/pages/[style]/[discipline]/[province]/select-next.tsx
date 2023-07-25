import { type NextPage, GetStaticProps } from "next";
import SelectNext from "@component/components/ProgramDisplay/SelectNext";
import { PathsArray, DisciplineProps } from "@component/data/types";
import {
  styles,
  disciplines,
  provincesFullReverse,
} from "@component/data/constants";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const DisciplinePage: NextPage<DisciplineProps> = ({
  style,
  discipline,
  province,
  citiesList,
}) => {
  const link = `/${style}/${discipline}/${province}`;
  const backLink = `/${style}/${discipline}/select-next`;

  const selectNextOptions = {
    style,
    discipline,
    province,
    link,
    backLink,
    nextValue: "city",
  };
  return (
    <SelectNext
      selectNextOptions={selectNextOptions}
      buttonList={citiesList || []}
    />
  );
};

const createPaths = async (): Promise<Array<PathsArray>> => {
  const finalArray: Array<PathsArray> = [];
  const allLocations = await prisma.location.findMany();
  const allSchoolLocations = await prisma.schoolLocation.findMany();

  for (const style of styles) {
    for (const discipline of disciplines) {
      let allProgramsInType;

      if (style === "pt") {
        allProgramsInType = await prisma.pTProgram.findMany({
          where: {
            discipline: {
              equals: discipline,
            },
          },
        });
      }

      if (style === "ft") {
        allProgramsInType = await prisma.fTProgram.findMany({
          where: {
            discipline: {
              equals: discipline,
            },
          },
        });
      }

      const provinceArray: string[] = [];
      const cityMap: { [province: string]: string[] } = {};

      allProgramsInType?.forEach((program) => {
        const schoolLocation = allSchoolLocations.find(
          (location) => location.id === program.schoolLocationId
        );

        if (schoolLocation) {
          const location = allLocations.find(
            (loc) => loc.id === schoolLocation.locationId
          );
          if (location) {
            const province = provincesFullReverse[location.province] || "N/A";

            if (!provinceArray.includes(province)) {
              provinceArray.push(province);
            }

            if (!cityMap[province]) {
              cityMap[province] = [];
            }
            if (
              cityMap[province] &&
              location.city &&
              !cityMap[province]!.includes(location.city)
            ) {
              cityMap[province]!.push(location.city);
            }
          }
        }
      });

      provinceArray.forEach((province) => {
        finalArray.push({
          params: {
            style: style,
            discipline: discipline,
            province: province,
            citiesList: cityMap[province] || [],
          },
        });
      });
    }
  }

  return finalArray;
};

export async function getStaticPaths() {
  const paths = await createPaths();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { style, discipline, province } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as DisciplineProps;

  const paths = await createPaths();
  const targetPath = paths.find(
    (path) =>
      path.params.style === style &&
      path.params.discipline === discipline &&
      path.params.province === province
  );
  const citiesList = targetPath ? targetPath.params.citiesList : [];

  return {
    props: {
      style,
      discipline,
      province,
      citiesList,
    },
  };
};

export default DisciplinePage;
