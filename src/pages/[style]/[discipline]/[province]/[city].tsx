import { GetStaticProps, type NextPage } from "next";
import allCites from "src/data/allCities.json";

import {
  styles,
  disciplines,
  provinces,
  provincesFull,
} from "src/data/constants";
import { DisciplineProps, PathsArray } from "@component/data/types";

import {
  SchoolLocation,
  School,
  Location,
  PTProgram,
  FTProgram,
} from "@prisma/client";
import ProgramDisplayComponent from "@component/components/ProgramDisplay/ProgramDisplayComponent";
import Menu from "@component/components/Menu/Menu";

export interface ProgramInfo extends SchoolLocation {
  school: School;
  location: Location;
  PTProgram: PTProgram[];
  FTProgram: FTProgram[];
}

export type ProgramInfoArray = ProgramInfo[];

const DisplayPage: NextPage<DisciplineProps> = ({
  style,
  discipline,
  city,
  province,
}) => {
  return (
    <div>
      <Menu />
      <ProgramDisplayComponent
        dataObject={{ style, discipline, city, province }}
      />
    </div>
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
  const { style, discipline, city, province } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as DisciplineProps;
  return {
    props: {
      style,
      discipline,
      city,
      province,
    },
  };
};

export default DisplayPage;
