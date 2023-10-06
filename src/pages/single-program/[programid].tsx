import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { PTProgram, FTProgram } from "@prisma/client";
import Head from "next/head";
import dynamic from "next/dynamic";
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

export interface SingleProgramPageProps {
  programid: string;
  programName: string;
}

export type SingleProgramPaths = {
  params: {
    programid: string;
  };
};

import SingleProgramPageComponent from "@component/components/SingleProgramPage/SingleProgramPageComponent";

const SingleProgramPage: NextPage<SingleProgramPageProps> = ({
  programid,
  programName,
}) => {
  const pageTitle = `Act. Sing. Dance. Repeat. ~ ${programName}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Featured Program - Act. Sing. Dance. Repeat. - ${programName}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content="Act. Sing. Dance. Blog." />
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
          <div>
            <Menu />
            <SingleProgramPageComponent programid={programid} />
          </div>
          <div className="mt-10">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
  );
};

const createPaths = async (): Promise<SingleProgramPaths[]> => {
  const allPTPrograms = await prisma.pTProgram.findMany();
  const allFTPrograms = await prisma.fTProgram.findMany();

  const allPrograms: (FTProgram | PTProgram)[] = [
    ...allPTPrograms,
    ...allFTPrograms,
  ];

  const allProgramPaths: SingleProgramPaths[] = allPrograms.map((program) => {
    return { params: { programid: program.id.toString() } };
  });

  return allProgramPaths;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await createPaths();
  return {
    // paths,
    // fallback: true,
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const programid = params?.programid;
  let programName = "";

  if (typeof programid === "string") {
    try {
      const programObject =
        (await prisma.fTProgram.findFirst({
          where: { id: programid },
        })) ||
        (await prisma.pTProgram.findFirst({
          where: { id: programid },
        }));

      if (programObject) {
        const schoolLocationObject = await prisma.schoolLocation.findFirst({
          where: { id: programObject.schoolLocationId },
        });

        if (schoolLocationObject) {
          const schoolObj = await prisma.school.findFirst({
            where: { id: schoolLocationObject.schoolId },
          });

          if (schoolObj) {
            programName = schoolObj.name.toUpperCase() || "";
          }
        }
      }
    } catch (error) {
      console.error("Error fetching school name: ", error);
    }
  }

  return {
    props: {
      programid,
      programName,
    },
  };
};

export default SingleProgramPage;
