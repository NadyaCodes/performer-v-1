import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { PTProgram, FTProgram } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { backChevron } from "@component/data/svgs";
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
  programName: string;
  blogData: string[];
}

export type SingleProgramPaths = {
  params: {
    programid: string;
  };
};

const FeaturedProgramComponent = dynamic(
  () =>
    import("@component/components/FeaturedProgram/FeaturedProgramComponent"),
  {
    ssr: true,
  }
);

const SingleProgramPage: NextPage<SingleProgramPageProps> = ({
  programName,
  blogData,
}) => {
  const pageTitle = `Act. Sing. Dance. Repeat. ~ ${programName}`;
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Act. Sing. Dance. Repeat. Featured Program Listing for ${programName}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={pageTitle} />
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
            <div
              className="absolute left-0 right-0 hidden h-10 bg-cyan-950 mobileMenu:block"
              style={{
                boxShadow:
                  "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
              }}
            ></div>
            <div className="h-10"></div>

            <button
              onClick={handleGoBack}
              className="m-2 flex rounded border-2 border-cyan-800 p-3 hover:scale-105 hover:shadow-md hover:shadow-cyan-600 mobileMenu:ml-10"
            >
              {backChevron} Go Back
            </button>
            <FeaturedProgramComponent blogData={blogData} />
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
  const allPTPrograms = await prisma.pTProgram.findMany({
    where: {
      articlePitch: {
        not: {
          equals: null,
        },
      },
    },
  });
  const allFTPrograms = await prisma.fTProgram.findMany({
    where: {
      articlePitch: {
        not: {
          equals: null,
        },
      },
    },
  });

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
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const programid = params?.programid;
  let programName = "";
  let blogData: string[] = [];

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
        blogData = programObject.articlePitch?.split("\\n") || [];
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
      blogData,
    },
  };
};

export default SingleProgramPage;
