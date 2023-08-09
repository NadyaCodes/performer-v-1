import { GetStaticProps, type NextPage } from "next";

import { styles, disciplines, provincesFullReverse } from "src/data/constants";
import { SelectNextProps, PathsArray } from "@component/data/types";

import {
  SchoolLocation,
  School,
  Location,
  PTProgram,
  FTProgram,
} from "@prisma/client";
import ProgramDisplayComponent from "@component/components/ProgramSelector/ProgramDisplayComponent";
import Menu from "@component/components/Menu/Menu";

export interface ProgramInfo extends SchoolLocation {
  school: School;
  location: Location;
  PTProgram: PTProgram[];
  FTProgram: FTProgram[];
}

export type ProgramInfoArray = ProgramInfo[];

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const DisplayPage: NextPage<SelectNextProps> = ({
  style,
  discipline,
  city,
  province,
}) => {
  return (
    <div className="min-h-screen bg-cyan-50 bg-opacity-80">
      <Menu />
      <ProgramDisplayComponent
        dataObject={{ style, discipline, city, province }}
      />
    </div>
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
        cityMap[province]?.forEach((city) => {
          finalArray.push({
            params: {
              style: style,
              discipline: discipline,
              province: province,
              city: city,
            },
          });
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { style, discipline, city, province } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as SelectNextProps;

  return {
    props: {
      style,
      discipline,
      city,
      province,
    },
  };
};

export default DisplayPage;
