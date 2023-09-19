import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { PTProgram, FTProgram } from "@prisma/client";
import Menu from "@component/components/Menu/Menu";
import Head from "next/head";
import { useRouter } from "next/router";
import { backChevron } from "@component/data/svgs";
import FooterComponent from "@component/components/Footer/FooterComponent";

export interface SingleProgramPageProps {
  programid: string;
}

export type SingleProgramPaths = {
  params: {
    programid: string;
  };
};

import { PrismaClient } from "@prisma/client";
import FeaturedProgramComponent from "@component/components/FeaturedProgram/FeaturedProgramComponent";

const prisma = new PrismaClient();

const SingleProgramPage: NextPage<SingleProgramPageProps> = ({ programid }) => {
  const pageTitle = `Featured Program - Act. Sing. Dance. Repeat. ~ ${programid}`;
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Act. Sing. Dance. Repeat." />
        <link rel="icon" href="/favicon.ico" />
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
            <FeaturedProgramComponent programId={programid} />
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

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context;

  const programid = params?.programid;

  return {
    props: {
      programid,
    },
  };
};

export default SingleProgramPage;
