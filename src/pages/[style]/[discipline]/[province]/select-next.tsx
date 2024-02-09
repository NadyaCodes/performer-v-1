import type { NextPage, GetStaticProps } from "next";
import SelectNext from "@component/components/ProgramDirectory/SelectNext";
import type { PathsArray, SelectNextProps } from "@component/data/types";
import {
  styles,
  disciplines,
  provincesFullReverse,
  stylesFull,
  disciplinesFull,
  provincesFull,
} from "@component/data/constants";
import Head from "next/head";
import dynamic from "next/dynamic";

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

import { prisma } from "@component/server/db";

const ProvincePage: NextPage<SelectNextProps> = ({
  style,
  discipline,
  province,
  citiesList,
}) => {
  const styleText = style || "ft";
  const disciplineText = discipline || "act";
  const provinceText = province || "ontario";
  const styleFull = stylesFull[style] || "Full Time";
  const disciplineFull = disciplinesFull[discipline || ""] || "acting";
  const provinceFull = provincesFull[province || ""] || "ontario";

  const link = `/${styleText}/${disciplineText}/${provinceText}`;
  const backLink = `/${styleText}/${disciplineText}/select-next`;

  let titleString = "";

  if (discipline && province) {
    titleString = `${styleFull} ${disciplineFull} Programs in ${provinceFull}`;
  } else if (discipline) {
    titleString = `${styleFull} ${disciplineFull} Programs in Canada`;
  } else if (province) {
    titleString = `${styleFull} Programs in ${provinceText}`;
  } else {
    titleString = `${styleFull} Programs in Canada`;
  }

  const selectNextOptions = {
    style,
    discipline,
    province,
    link,
    backLink,
    nextValue: "city",
    buttonList: citiesList || [],
    titleString,
  };

  return (
    <>
      <Head>
        <title>{`${titleString} | Act. Sing. Dance. Repeat.`}</title>
        <meta
          name="description"
          content={`Program Directory ~ Act. Sing. Dance. Repeat. ~ ${styleFull} ${disciplineFull} Programs in ${provinceFull}`}
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

            const cityList = cityMap[province];
            const city = location.city;

            if (cityList && city && !cityList.includes(city)) {
              cityList.push(city);
            }
          }
        }
      });

      provinceArray.forEach((province) => {
        cityMap[province]?.sort((a, b) => {
          const nameA = a || "";
          const nameB = b || "";

          return nameA.localeCompare(nameB);
        });
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
  } as SelectNextProps;

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

export default ProvincePage;
