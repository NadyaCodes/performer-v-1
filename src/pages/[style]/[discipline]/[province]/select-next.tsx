import { type NextPage, GetStaticProps } from "next";
import Link from "next/link";
import Picker from "@component/pages/Picker";
import { PathsArray, DisciplineProps } from "@component/data/types";
import {
  styles,
  disciplines,
  provinces,
  provincesFull,
} from "@component/data/constants";
import allCities from "src/data/allCities.json";

const DisciplinePage: NextPage<DisciplineProps> = ({
  style,
  discipline,
  province,
  citiesList,
}) => {
  const link = `/${style}/${discipline}/${province}`;
  const backLink = `/${style}/${discipline}/select-next`;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Which City?
      </h1>
      <div
        style={{
          display: "flex",
          margin: "2rem",
        }}
        className="rounded border-2 border-green-300"
      >
        <Picker
          buttonOptions={citiesList || ["nothing"]}
          currentLink={link}
          last={true}
        />
      </div>
      <Link href={backLink} className="p-2">
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
      provinces.forEach((province) => {
        finalArray.push({
          params: {
            style: style,
            discipline: discipline,
            province: province,
          },
        });
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
  const { style, discipline, province } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as DisciplineProps;
  const citiesInProvince = Object.values(allCities)
    .filter((element) => element.province === provincesFull[province || "na"])
    .map((element) => element.city);

  return {
    props: {
      style,
      discipline,
      province,
      citiesList: citiesInProvince,
    },
  };
};

export default DisciplinePage;
