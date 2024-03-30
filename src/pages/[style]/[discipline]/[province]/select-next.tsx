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
import type { ProgramInfoArray } from "./[city]";
import type { ProgramWithInfo } from "@component/components/ProgramFinder/types";

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

import { prisma } from "@component/server/db";
import PartialProgramDisplay from "@component/components/ProgramDirectory/PartialProgramDisplay";

const ProvincePage: NextPage<SelectNextProps> = ({
  style,
  discipline,
  province,
  citiesList,
  itemArray,
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
  let metaTitleString = "";

  if (discipline && province) {
    titleString = `${styleFull} ${disciplineFull} Programs in ${provinceFull}`;
    metaTitleString = `${disciplineFull} Programs ${provinceFull.toUpperCase()}`;
  } else if (discipline) {
    titleString = `${styleFull} ${disciplineFull} Programs in Canada`;
    metaTitleString = `${disciplineFull} Programs Canada`;
  } else if (province) {
    titleString = `${styleFull} Programs in ${provinceText}`;
    metaTitleString = `${styleFull} Programs ${provinceText}`;
  } else {
    titleString = `${styleFull} Programs in Canada`;
    metaTitleString = `${styleFull} Programs Canada`;
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
        <title>{`${metaTitleString} | Act. Sing. Dance. Repeat.`}</title>
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
        <div className="flex flex-col justify-between bg-cyan-50 bg-opacity-80">
          <div className="min-h-screen">
            <SelectNext selectNextOptions={selectNextOptions} />
          </div>
          <div className="flex flex-col items-center">
            <div className="m-8 h-2 w-10/12 rounded bg-indigo-900 bg-opacity-90 xl:m-16"></div>
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

  try {
    if (province) {
      const provinceFull = provincesFull[province] || "none";
      const locationArray = await prisma.location.findMany({
        where: { province: provinceFull },
      });

      if (!locationArray) {
        console.log("Location ID not found");
        return {
          props: { style, discipline, province, citiesList, itemArray: [] },
        };
      }

      const programInfoArrayPromises: Promise<ProgramInfoArray> = Promise.all(
        (citiesList || []).map(async (item) => {
          let locationId = locationArray.find(
            (element) => element.city === item
          )?.id;
          const result = await prisma.schoolLocation.findMany({
            where: { locationId: locationId },
            include: {
              location: true,
              school: true,
              PTProgram: true,
              FTProgram: true,
            },
          });
          return result as ProgramInfoArray;
        })
      ).then((arrays) => arrays.flat());

      const programInfoArray: ProgramInfoArray = await programInfoArrayPromises;

      if (discipline) {
        const filteredArray = filterArray(programInfoArray, discipline, style);

        return {
          props: {
            style,
            discipline,
            province,
            citiesList,
            itemArray: filteredArray,
          },
        };
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await prisma.$disconnect();
  }

  return {
    props: {
      style,
      discipline,
      province,
      citiesList,
      itemArray: [],
    },
  };
};

export default ProvincePage;
