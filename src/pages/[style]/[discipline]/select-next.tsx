import { type NextPage, GetStaticProps } from "next";
import { disciplines, provincesFullReverse } from "@component/data/constants";
import { PathsArray, SelectNextProps } from "@component/data/types";
import { styles } from "@component/data/constants";
import SelectNext from "@component/components/ProgramDisplay/SelectNext";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const DisciplinePage: NextPage<SelectNextProps> = ({
  style,
  discipline,
  provincesList,
}) => {
  const link = `/${style}/${discipline}/`;
  const backLink = `/${style}/select-next`;

  const selectNextOptions = {
    style,
    discipline,
    link,
    backLink,
    nextValue: "province",
  };

  return (
    <SelectNext
      selectNextOptions={selectNextOptions}
      buttonList={provincesList || []}
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
          }
        }
      });
      finalArray.push({
        params: {
          style: style,
          discipline: discipline,
          provincesList: provinceArray || [],
        },
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
  const { style, discipline } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as SelectNextProps;

  const paths = await createPaths();
  const targetPath = paths.find(
    (path) =>
      path.params.style === style && path.params.discipline === discipline
  );
  const provincesList = targetPath ? targetPath.params.provincesList : [];

  return {
    props: {
      style,
      discipline,
      provincesList,
    },
  };
};

export default DisciplinePage;
