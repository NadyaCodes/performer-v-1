import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { PTProgram, FTProgram } from "@prisma/client";
import Menu from "@component/components/Menu/Menu";

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
  return (
    <div>
      <Menu />
      <SingleProgramPageComponent programid={programid} />
    </div>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const programid = params?.programid;
  return {
    props: {
      programid,
    },
  };
};

export default SingleProgramPage;
