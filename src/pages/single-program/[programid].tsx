import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { PTProgram, FTProgram } from "@prisma/client";
import Menu from "@component/components/Menu/Menu";
import Head from "next/head";
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
import SingleProgramPageComponent from "@component/components/SingleProgramPage/SingleProgramPageComponent";

const prisma = new PrismaClient();

const SingleProgramPage: NextPage<SingleProgramPageProps> = ({ programid }) => {
  const pageTitle = `Act. Sing. Dance. Repeat. ~ ${programid}`;

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
