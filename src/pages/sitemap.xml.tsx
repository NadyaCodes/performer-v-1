import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import type { FTProgram, PTProgram } from "@prisma/client";
import {
  styles,
  disciplines,
  provincesFullReverse,
} from "@component/data/constants";
import type { Location } from "@prisma/client";

const prisma = new PrismaClient();

const staticURLs = [
  "about",
  "blog",
  "contact",
  "merch",
  "my-programs",
  "patreon",
  "program-directory",
  "program-finder",
  "sitemap.xml",
];

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  ctx.res.setHeader("Content-Type", "text/xml");
  ctx.res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");
  const xml = await generateSitemap();

  ctx.res.write(xml);
  ctx.res.end();
  return {
    props: {},
  };
};

async function generateSitemap(): Promise<string> {
  const allBlogUrls = await prisma.post.findMany();

  const allProgramsData = await prisma
    .$transaction([
      prisma.pTProgram.findMany({
        include: {
          SchoolLocation: true,
        },
      }),
      prisma.fTProgram.findMany({
        include: {
          SchoolLocation: true,
        },
      }),
    ])
    .catch((error) =>
      console.error("Error fetching all programs data: ", error)
    );

  const allLocations = await prisma.location
    .findMany()
    .catch((error) => console.error("Error fetching location data: ", error));

  if (allProgramsData) {
    const allPTPrograms = allProgramsData[0];
    const allFTPrograms = allProgramsData[1];

    const allFeatPrograms: (FTProgram | PTProgram)[] = [
      ...allPTPrograms.filter((program) => program.articlePitch !== null),
      ...allFTPrograms.filter((program) => program.articlePitch !== null),
    ];

    const allPrograms: (FTProgram | PTProgram)[] = [
      ...allPTPrograms,
      ...allFTPrograms,
    ];

    const getLocationsArray = (style: string, discipline: string) => {
      let allProgramsInType;

      if (style === "pt") {
        allProgramsInType = allPTPrograms.filter(
          (program) => program.discipline === discipline
        );
      }

      if (style === "ft") {
        allProgramsInType = allFTPrograms.filter(
          (program) => program.discipline === discipline
        );
      }

      const locationID: string[] = [];
      const locationArray: Location[] = [];

      allProgramsInType?.forEach((program) => {
        if (!locationID.includes(program.SchoolLocation.locationId)) {
          if (allLocations) {
            const location = allLocations.find(
              (location) => location.id === program.SchoolLocation.locationId
            );
            locationID.push(program.SchoolLocation.locationId);
            location && locationArray.push(location);
          }
        }
      });
      return locationArray;
    };

    function getAvailableProvincesForStyleAndDiscipline(
      style: string,
      discipline: string
    ) {
      const locationArray = getLocationsArray(style, discipline);
      const allProvinces: string[] = [];
      locationArray.forEach((location) => {
        if (!allProvinces.includes(location.province)) {
          allProvinces.push(location.province);
        }
      });

      return allProvinces;
    }

    function getAvailableCitiesForStyleAndDiscipline(
      style: string,
      discipline: string
    ) {
      const locationArray = getLocationsArray(style, discipline);
      const allCities: string[] = [];
      locationArray.forEach((location) => {
        if (!allCities.includes(location.city)) {
          allCities.push(location.city);
        }
      });
      return allCities;
    }

    const generateBlogUrlsSection = () => {
      return allBlogUrls
        .map((page) => {
          return `
          <url>
            <loc>https://www.actsingdancerepeat.com/blog/${page.slug}</loc>
            <lastmod>${page.createdAt.toISOString().substring(0, 10)}</lastmod>
          </url>`;
        })
        .join("");
    };

    const generateFeatProgramUrlsSection = (
      programs: (FTProgram | PTProgram)[]
    ) => {
      return programs
        .map((program) => {
          return `
          <url>
          <loc>https://www.actsingdancerepeat.com/featured-program/${program.id}</loc>
          <lastmod>2023-10-01</lastmod>
          </url>`;
        })
        .join("");
    };

    const generateSingleProgramUrlsSection = (
      programs: (FTProgram | PTProgram)[]
    ) => {
      return programs
        .map((program) => {
          return `
          <url>
          <loc>https://www.actsingdancerepeat.com/single-program/${program.id}</loc>
          <lastmod>2023-10-01</lastmod>
          </url>`;
        })
        .join("");
    };

    const generateStaticUrlSection = (urlList: string[]) => {
      return urlList
        .map((url) => {
          return `  <url>
    <loc>https://www.actsingdancerepeat.com/${url}</loc>
    <lastmod>2023-10-01</lastmod>
  </url>
    `;
        })
        .join("");
    };

    const generateStylesSection = (styleList: string[]) => {
      return styleList
        .map((style) => {
          return `  <url>
<loc>https://www.actsingdancerepeat.com/${style}/select-next</loc>
<lastmod>2023-10-01</lastmod>
</url>
`;
        })
        .join("");
    };

    const generateDisciplinesSection = (
      stylesList: string[],
      disciplineList: string[]
    ) => {
      return stylesList.map((style) => {
        return disciplineList
          .map((discipline) => {
            return `  <url>
        <loc>https://www.actsingdancerepeat.com/${style}/${discipline}/select-next</loc>
        <lastmod>2023-10-01</lastmod>
      </url>`;
          })
          .join("");
      });
    };

    const generateProvincesSection = (
      stylesList: string[],
      disciplineList: string[]
    ) => {
      return stylesList.map((style) => {
        return disciplineList.map((discipline) => {
          const availableProvinces = getAvailableProvincesForStyleAndDiscipline(
            style,
            discipline
          );
          return availableProvinces
            .map((province) => {
              const provinceShort = provincesFullReverse[province];
              return `<url>
              <loc>https://www.actsingdancerepeat.com/${style}/${discipline}/${provinceShort}/select-next</loc>
              <lastmod>2023-10-01</lastmod>
            </url>`;
            })
            .join("");
        });
      });
    };

    const generateCitiesSection = (
      stylesList: string[],
      disciplineList: string[]
    ) => {
      return stylesList.map((style) => {
        return disciplineList.map((discipline) => {
          const availableCities = getAvailableCitiesForStyleAndDiscipline(
            style,
            discipline
          );
          return availableCities
            .map((city) => {
              if (allLocations) {
                const locationObject = allLocations.find(
                  (location) => location.city === city
                );
                const provinceString = locationObject?.province || "ontario";
                const province = provincesFullReverse[provinceString];
                return `<url>
                  <loc>https://www.actsingdancerepeat.com/${style}/${discipline}/${province}/${city}</loc>
                  <lastmod>2023-10-01</lastmod>
                </url>`;
              }
            })

            .join("");
        });
      });
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
${generateStaticUrlSection(staticURLs)}
  ${generateBlogUrlsSection()}
  ${generateFeatProgramUrlsSection(allFeatPrograms)}
  ${generateSingleProgramUrlsSection(allPrograms)}
  ${generateStylesSection(styles)}
  ${generateDisciplinesSection(styles, disciplines)}
  ${generateProvincesSection(styles, disciplines)}
  ${generateCitiesSection(styles, disciplines)}
</urlset>`;

    return xml;
  }
  return "";
}
