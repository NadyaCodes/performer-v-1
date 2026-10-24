import type { NextPage, GetStaticProps } from "next";
import {
  disciplines,
  disciplinesFull,
  provincesFullReverse,
  stylesFull,
} from "@component/data/constants";
import type { PathsArray, SelectNextProps } from "@component/data/types";
import { styles } from "@component/data/constants";
import SelectNext from "@component/components/ProgramDirectory/SelectNext";
import Head from "next/head";
import dynamic from "next/dynamic";
import { prisma } from "@component/server/db";
import PartialProgramDisplay from "@component/components/ProgramDirectory/PartialProgramDisplay";
import type { ProgramInfoArray } from "./[province]/[city]";
import type { ProgramWithInfo } from "@component/components/ProgramFinder/types";

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

const DisciplinePage: NextPage<SelectNextProps> = ({
  style,
  discipline,
  provincesList,
  itemArray,
}) => {
  const styleText = style || "ft";
  const disciplineText = discipline || "act";
  const styleFull = stylesFull[style] || "Full Time";
  const disciplineFull = disciplinesFull[discipline || ""] || "acting";

  const link = `/${styleText}/${disciplineText}/`;
  const backLink = `/${styleText}/select-next`;
  let titleString = "";
  let metaTitleString = "";
  if (discipline) {
    titleString = `${styleFull} ${disciplineFull} Programs in Canada`;
    metaTitleString = `${disciplineFull} Programs Canada`;
  } else {
    titleString = `${styleFull} programs in Canada`;
    metaTitleString = `${styleFull} Programs Canada`;
  }

  const selectNextOptions = {
    style,
    discipline,
    link,
    backLink,
    nextValue: "province",
    buttonList: provincesList || [],
    titleString,
  };

  return (
    <>
      <Head>
        <title>{`${metaTitleString} ${styleText.toUpperCase()} | Act. Sing. Dance. Repeat.`}</title>
        <meta
          name="description"
          content={`Program Directory ~ Act. Sing. Dance. Repeat. ~ ${styleFull} ${disciplineFull} Programs`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={titleString} />
        <meta
          property="og:image"
          content="https://www.actsingdancerepeat.com/ActSingDanceRepeatLogo2.png"
        />
        <meta
          name="keywords"
          content="actors, singers, dancers, musical theatre, resources, performers, canadian"
        />
      </Head>
      <main>
        <div className="flex flex-col justify-between bg-cyan-50/80">
          <div className="min-h-screen">
            <SelectNext selectNextOptions={selectNextOptions} />
          </div>
          <div className="flex flex-col items-center">
            <div className="m-8 h-2 w-10/12 rounded bg-indigo-900/90 xl:m-16"></div>
            <h2
              className="mx-10 mt-4 w-9/12 text-center text-4xl font-extrabold capitalize tracking-tight text-indigo-900 2xl:text-6xl"
              id="all_programs"
            >
              All {titleString}
            </h2>
            <PartialProgramDisplay itemArray={itemArray || null} />
          </div>
          <div className="mt-20">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
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

      provinceArray.sort((a, b) => {
        const nameA = a || "";
        const nameB = b || "";

        return nameA.localeCompare(nameB);
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

/**
 * getStaticProps runs once per page and each build worker renders hundreds of them.
 * Resolving the paths reads every location and program table, so cache the promise and
 * let all the pages a worker renders share one lookup instead of repeating it.
 */
let cachedPaths: Promise<Array<PathsArray>> | undefined;

const getPaths = (): Promise<Array<PathsArray>> => {
  cachedPaths = cachedPaths ?? createPaths();
  return cachedPaths;
};

export async function getStaticPaths() {
  const paths = await getPaths();

  return {
    paths,
    fallback: false,
  };
}

const filterArray = (
  infoArray: ProgramInfoArray,
  discipline: string,
  style: string
) => {
  const filterStyle = infoArray.filter((element) => {
    if (style === "pt") {
      if (element.PTProgram.length > 0) {
        return element;
      }
    }
    if (style === "ft") {
      if (element.FTProgram.length > 0) {
        return element;
      }
    }
  });

  const programArray: ProgramWithInfo[] = [];

  filterStyle.forEach((element) => {
    if (style === "pt") {
      element?.PTProgram.forEach((program) => {
        if (program.discipline === discipline) {
          programArray.push({
            id: program.id,
            schoolLocationId: program.schoolLocationId,
            website: program.website,
            discipline: program.discipline,
            type: "pt",
            cityObj: element.location,
            schoolObj: element.school,
            articlePitch: program.articlePitch || "",
            elevatorPitch: program.elevatorPitch || "",
          });
        }
      });
    }

    if (style === "ft") {
      element?.FTProgram.forEach((program) => {
        if (program.discipline === discipline) {
          programArray.push({
            id: program.id,
            schoolLocationId: program.schoolLocationId,
            website: program.website,
            discipline: program.discipline,
            type: "ft",
            name: program.name,
            cityObj: element.location,
            schoolObj: element.school,
            articlePitch: program.articlePitch || "",
            elevatorPitch: program.elevatorPitch || "",
          });
        }
      });
    }
  });

  programArray.sort((a, b) => {
    const nameA = a.schoolObj?.name || "";
    const nameB = b.schoolObj?.name || "";

    return nameA.localeCompare(nameB);
  });

  return programArray;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { style, discipline } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as SelectNextProps;

  const paths = await getPaths();
  const targetPath = paths.find(
    (path) =>
      path.params.style === style && path.params.discipline === discipline
  );
  const provincesList = targetPath ? targetPath.params.provincesList : [];

  if (!discipline || (style !== "pt" && style !== "ft")) {
    return { props: { style, discipline, provincesList, itemArray: [] } };
  }

  /**
   * One query per page: the school locations offering this discipline, with their
   * school and location attached. This used to run three queries for every program,
   * and looked the location up by the school location's own id rather than its
   * locationId, so cityObj came back null for every entry.
   *
   * A failure here is deliberately left to propagate. It was previously logged and
   * then served as an empty directory page, which looked like a discipline with no
   * programs rather than a broken build.
   */
  const programInfoArray: ProgramInfoArray =
    await prisma.schoolLocation.findMany({
      where:
        style === "pt"
          ? { PTProgram: { some: { discipline } } }
          : { FTProgram: { some: { discipline } } },
      include: {
        location: true,
        school: true,
        PTProgram: true,
        FTProgram: true,
      },
    });

  return {
    props: {
      style,
      discipline,
      provincesList,
      itemArray: filterArray(programInfoArray, discipline, style),
    },
  };
};

export default DisciplinePage;
