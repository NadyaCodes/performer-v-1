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
        <title>{`${metaTitleString} | Act. Sing. Dance. Repeat.`}</title>
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
        <div className="flex min-h-screen flex-col justify-between bg-cyan-50 bg-opacity-80">
          <SelectNext selectNextOptions={selectNextOptions} />
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
