import { type NextPage, GetStaticProps } from "next";
import Link from "next/link";
import Picker from "../../components/ProgramDisplay/Picker";
import { disciplines } from "@component/data/constants";
import { PathsArray, DisciplineProps } from "@component/data/types";
import { styles } from "@component/data/constants";

const StylePage: NextPage<DisciplineProps> = ({ style }) => {
  const link = `/${style}`;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        What Discipline?
      </h1>
      <div
        style={{
          display: "flex",
          margin: "2rem",
        }}
        className="rounded border-2 border-green-300"
      >
        <Picker buttonOptions={disciplines} currentLink={link} last={false} />
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
    finalArray.push({
      params: {
        style: style,
      },
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
  // const { style } = params as DisciplineProps;
  const { style } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as DisciplineProps;

  return {
    props: {
      style,
    },
  };
};

export default StylePage;
