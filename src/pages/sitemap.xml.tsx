import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import type { FTProgram, PTProgram } from "@prisma/client";

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
  return {
    props: {},
  };
};

async function generateSitemap(): Promise<string> {
  const allBlogUrls = await prisma.post.findMany();

  const allProgramsData = await prisma.$transaction([
    prisma.pTProgram.findMany(),
    prisma.fTProgram.findMany(),
  ]);

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

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  ${allBlogUrls
    .map((page) => {
      return `  <url>
    <loc>https://www.actsingdancerepeat.com/blog/${page.slug}</loc>
    <lastmod>${page.createdAt.toISOString().substring(0, 10)}</lastmod>
  </url>
    `;
    })
    .join("")}
  ${allFeatPrograms
    .map((program) => {
      return `  <url>
    <loc>https://www.actsingdancerepeat.com/featured-program/${program.id}</loc>
    <lastmod>2023-10-01</lastmod>
  </url>
    `;
    })
    .join("")}
  ${allPrograms
    .map((program) => {
      return `  <url>
    <loc>https://www.actsingdancerepeat.com/single-program/${program.id}</loc>
    <lastmod>2023-10-01</lastmod>
  </url>
    `;
    })
    .join("")}
    ${staticURLs
      .map((url) => {
        return `  <url>
      <loc>https://www.actsingdancerepeat.com/${url}</loc>
      <lastmod>2023-10-01</lastmod>
    </url>
      `;
      })
      .join("")}
</urlset>`;

  return xml;
}
