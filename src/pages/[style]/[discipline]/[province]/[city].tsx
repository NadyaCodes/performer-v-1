import { GetStaticProps, type NextPage } from "next";
import Link from "next/link";
import allCites from "src/data/allCities.json";
import {
  styles,
  disciplines,
  provinces,
  provincesFull,
} from "src/data/constants";
import { DisciplineProps, PathsArray } from "@component/data/types";

const DisciplinePage: NextPage<DisciplineProps> = ({
  style,
  discipline,
  city,
  province,
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-6xl font-extrabold text-white">
        {style} {discipline} programs in {city}, {province}
      </h1>
      <div className="m-10 text-white"> Calculated Programs List</div>
      <Link href="/">
        <button
          style={{ margin: "2rem" }}
          className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white"
        >
          Home
        </button>
      </Link>
    </main>
  );
};

const createPaths = (): Array<PathsArray> => {
  const finalArray: Array<PathsArray> = [];
  styles.forEach((style) => {
    disciplines.forEach((discipline) => {
      provinces.forEach((province) => {
        const citiesInCategory = Object.values(allCites)
          .filter((element) => element.province === provincesFull[province])
          .map((element) => element.city);

        citiesInCategory.forEach((city) => {
          finalArray.push({
            params: {
              style: style,
              discipline: discipline,
              province: province,
              city: city,
            },
          });
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
  const { style, discipline, city, province } = params as DisciplineProps;

  return {
    props: {
      style,
      discipline,
      city,
      province,
    },
  };
};

export default DisciplinePage;
