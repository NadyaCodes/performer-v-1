import type { NextPage, GetStaticPropsContext } from "next";
import { styles, disciplines, provincesFullReverse } from "src/data/constants";
import type { SelectNextProps, PathsArray } from "@component/data/types";
import Head from "next/head";
import { stylesFull, disciplinesFull, provincesFull } from "src/data/constants";
import type { ProgramWithInfo } from "@component/components/ProgramFinder/types";
import dynamic from "next/dynamic";
import type {
  SchoolLocation,
  School,
  Location,
  PTProgram,
  FTProgram,
} from "@prisma/client";
import { prisma } from "@component/server/db";

const Menu = dynamic(() => import("@component/components/Menu/Menu"), {
  ssr: true,
});

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

export interface ProgramInfo extends SchoolLocation {
  school: School;
  location: Location;
  PTProgram: PTProgram[];
  FTProgram: FTProgram[];
}

export type ProgramInfoArray = ProgramInfo[];

const ProgramDisplayComponent = dynamic(
  () =>
    import("@component/components/ProgramDirectory/ProgramDisplayComponent"),
  {
    ssr: true,
  }
);

const DisplayPage: NextPage<SelectNextProps> = ({
  style,
  discipline,
  city,
  province,
  titleString,
  itemArray,
}) => {
  const provinceText = province || "ontario";
  const cityText = city || "toronto";
  const styleFull = stylesFull[style] || "Full Time";
  const disciplineFull = disciplinesFull[discipline || ""] || "acting";

  let metaTitleString = "";

  if (discipline && province && city) {
    metaTitleString = `${disciplineFull} Programs ${cityText.toUpperCase()}`;
  } else if (discipline) {
    metaTitleString = `${disciplineFull} Programs Canada`;
  } else if (province) {
    metaTitleString = `${styleFull} Programs ${provinceText.toUpperCase()}`;
  } else {
    metaTitleString = `${styleFull} Programs Canada`;
  }

  return (
    <>
      <Head>
        <title>{`${metaTitleString || "Program Directory"} ${
          style.toUpperCase() || "FT"
        } | Act. Sing. Dance. Repeat.`}</title>
        <meta
          name="description"
          content={`Program Directory ~ Act. Sing. Dance. Repeat. ~ ${
            titleString || "Canadian Performing Arts Schools"
          }`}
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
          <div className="">
            <Menu />

            <ProgramDisplayComponent
              dataObject={{ style, discipline, city, province }}
              itemArray={itemArray || null}
            />
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
            if (
              cityMap[province] &&
              location.city !== undefined &&
              cityMap[province] &&
              cityMap[province]?.indexOf(location.city) === -1
            ) {
              cityMap[province]?.push(location.city);
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

/**
 * How many cities to pre-render, ranked by how many programs they hold. 280 cities have
 * programs between them, but in the 30 days to 2026-10-24 only 36 city pages were
 * visited at all, and the busiest took 7 visitors. Pre-rendering all 561 combinations
 * spent around eleven minutes of every build on pages nobody requested, and that cost
 * grew with every program added.
 *
 * The rest are generated on the first request and cached from then on. They stay
 * indexable: sitemap.xml is server rendered from the database and lists every city URL
 * regardless of this, and fallback "blocking" serves a crawler fully rendered HTML
 * rather than an empty shell.
 */
const PRERENDERED_CITY_COUNT = 25;

const topCitiesByProgramCount = async (
  limit: number
): Promise<Set<string>> => {
  const schoolLocations = await prisma.schoolLocation.findMany({
    include: { location: true, PTProgram: true, FTProgram: true },
  });

  const counts = new Map<string, number>();
  for (const schoolLocation of schoolLocations) {
    const city = schoolLocation.location.city;
    counts.set(
      city,
      (counts.get(city) ?? 0) +
        schoolLocation.PTProgram.length +
        schoolLocation.FTProgram.length
    );
  }

  return new Set(
    [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([city]) => city)
  );
};

export async function getStaticPaths() {
  const [paths, topCities] = await Promise.all([
    createPaths(),
    topCitiesByProgramCount(PRERENDERED_CITY_COUNT),
  ]);

  return {
    paths: paths.filter((path) => topCities.has(path.params.city ?? "")),
    fallback: "blocking",
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

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { style, discipline, city, province } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as SelectNextProps;

  let titleString = "";
  const provinceText = province || "ontario";
  const cityText = city || "toronto";
  const styleFull = stylesFull[style] || "Full Time";
  const disciplineFull = disciplinesFull[discipline || ""] || "acting";
  const provinceFull = provincesFull[province || ""] || "ontario";

  if (discipline && province && city) {
    titleString = `${styleFull} ${disciplineFull} Programs in ${cityText}, ${provinceFull}`;
  } else if (discipline) {
    titleString = `${styleFull} ${disciplineFull} Programs in Canada`;
  } else if (province) {
    titleString = `${styleFull} Programs in ${provinceText}`;
  } else {
    titleString = `${styleFull} Programs in Canada`;
  }

  /**
   * A failed query is deliberately left to propagate. It was previously logged and then
   * served as an empty directory page, which looked like a city with no programs rather
   * than a broken build. The prisma client is a process-wide singleton, so this must not
   * disconnect it either -- doing so tore the pool down after every page in the build.
   */
  if (city && province && discipline) {
    const location = await prisma.location.findFirst({
      where: { city, province: provincesFull[province] || "none" },
    });

    if (location) {
      const programInfoArray = await prisma.schoolLocation.findMany({
        where: { locationId: location.id },
        include: {
          location: true,
          school: true,
          PTProgram: true,
          FTProgram: true,
        },
      });

      const itemArray = filterArray(programInfoArray, discipline, style);

      /**
       * Only combinations that have programs were ever in getStaticPaths, so anything
       * else used to 404. Now that fallback is "blocking" every url reaches this, so
       * say so explicitly -- otherwise any made up city would render as a thin, empty,
       * indexable page.
       */
      if (itemArray.length > 0) {
        return {
          props: {
            style,
            discipline,
            city,
            province,
            itemArray,
            titleString,
          },
        };
      }
    }
  }

  return { notFound: true };
};

export default DisplayPage;
