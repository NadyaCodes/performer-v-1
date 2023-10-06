import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { prisma } from "@component/server/db";
import type { ProgramWithType } from "@component/components/MyPrograms/MyProgramsComponent";

const Menu = dynamic(() => import("@component/components/Menu/Menu"), {
  ssr: true,
});

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

const SingleProgramPageComponent = dynamic(
  () =>
    import(
      "@component/components/SingleProgramPage/SingleProgramPageComponent"
    ),
  {
    ssr: true,
  }
);

export interface SingleProgramPageProps {
  programName: string;
  programObject: null | ProgramWithType;
}

export type SingleProgramPaths = {
  params: {
    programid: string;
  };
};

const SingleProgramPage: NextPage<SingleProgramPageProps> = ({
  programName,
  programObject,
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
            <SingleProgramPageComponent programObject={programObject} />
          </div>
          <div className="mt-10">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const programid = params?.programid;
  let programName = "";
  let programObject: null | ProgramWithType = null;

  if (typeof programid === "string") {
    try {
      programObject =
        (await prisma.fTProgram
          .findFirst({
            where: { id: programid },
          })
          .then((data) => (data ? { ...data, type: "ft" } : null))) ||
        (await prisma.pTProgram
          .findFirst({
            where: { id: programid },
          })
          .then((data) => (data ? { ...data, type: "pt" } : null)));

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
      programName,
      programObject,
    },
  };
};

export default SingleProgramPage;
