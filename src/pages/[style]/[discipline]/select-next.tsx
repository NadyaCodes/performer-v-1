import { type NextPage, GetStaticProps } from "next";
import Link from "next/link";
import Picker from "@component/pages/Picker";
import { disciplines, provinces } from "@component/data/constants";
import { PathsArray, DisciplineProps } from "@component/data/types";
import { styles } from "@component/data/constants";

const DisciplinePage: NextPage<DisciplineProps> = ({ style, discipline }) => {
  const link = `/${style}/${discipline}`;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Which Province?
      </h1>
      <div
        style={{
          display: "flex",
          margin: "2rem",
        }}
        className="rounded border-2 border-green-300"
      >
        <Picker buttonOptions={provinces} currentLink={link} last={false} />
      </div>
      <Link href="/" className="p-2">
        <button className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white">
          Back
        </button>
      </Link>
    </div>
  );
};

const createPaths = (): Array<PathsArray> => {
  const finalArray: Array<PathsArray> = [];
  styles.forEach((style) => {
    disciplines.forEach((discipline) => {
      finalArray.push({
        params: {
          style: style,
          discipline: discipline,
        },
      });
    });
  });
  return finalArray;
};

export async function getStaticPaths() {
  const paths = createPaths();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { style, discipline } = params as DisciplineProps;

  return {
    props: {
      style,
      discipline,
    },
  };
};

export default DisciplinePage;
