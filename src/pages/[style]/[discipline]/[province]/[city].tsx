import { GetStaticProps, type NextPage } from "next";
import { useState, useEffect } from "react";
import ProgramItem from "@component/components/ProgramSearch/ProgramItem";
import allCites from "src/data/allCities.json";
import { api } from "@component/utils/api";
import { useSession } from "next-auth/react";

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
import { ProgramWithInfo } from "@component/components/ProgramSearch/types";
import ProgramDisplayComponent from "@component/components/ProgramDisplay/ProgramDisplayComponent";

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
  const [itemArray, setItemArray] = useState<ProgramWithInfo[]>([]);
  const [userFavs, setUserFavs] = useState<string[] | null>(null);
  const { data: sessionData } = useSession();

  const utils = api.useContext();

  const fetchLocationId = async (city: string, province: string) => {
    const provinceFull = provincesFull[province] || "none";
    const location = await utils.location.getOne.fetch({
      city,
      province: provinceFull,
    });
    return location?.id;
  };

  const fetchProgramInfoArray = async (
    locationId: string
  ): Promise<ProgramInfoArray> => {
    const programInfo =
      await utils.schoolLocation.getAllForLocationPlusInfo.fetch({
        locationId,
      });
    return programInfo;
  };

  const filterArray = (
    infoArray: ProgramInfoArray,
    discipline: string,
    style: string
  ) => {
    const filterStyle = infoArray.filter((element) => {
      if (style === "pt") {
        if (element.PTProgram.length > 0) {
          return element;
        }
      }
      if (style === "ft") {
        if (element.FTProgram.length > 0) {
          return element;
        }
      }
    });

    const programArray: ProgramWithInfo[] = [];

    filterStyle.forEach((element) => {
      if (style === "pt") {
        element?.PTProgram.forEach((program) => {
          if (program.discipline === discipline) {
            programArray.push({
              id: program.id,
              schoolLocationId: program.schoolLocationId,
              website: program.website,
              discipline: program.discipline,
              type: "pt",
              cityObj: element.location,
              schoolObj: element.school,
            });
          }
        });
      }

      if (style === "ft") {
        element?.FTProgram.forEach((program) => {
          if (program.discipline === discipline) {
            programArray.push({
              id: program.id,
              schoolLocationId: program.schoolLocationId,
              website: program.website,
              discipline: program.discipline,
              type: "pt",
              name: program.name,
              cityObj: element.location,
              schoolObj: element.school,
            });
          }
        });
      }
    });
    return programArray;
  };

  const fetchData = async ({
    style,
    discipline,
    city,
    province,
  }: {
    style: string;
    discipline: string | undefined;
    city: string | undefined;
    province: string | undefined;
  }) => {
    try {
      if (city && province) {
        const locationId = await fetchLocationId(city, province);
        if (!locationId) {
          console.log("Location ID not found");
          return;
        }

        const programInfoArray: ProgramInfoArray = await fetchProgramInfoArray(
          locationId
        );

        if (discipline) {
          const filteredArray = filterArray(
            programInfoArray,
            discipline,
            style
          );

          return filteredArray;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData({ style, discipline, city, province }).then((result) => {
      if (result) {
        setItemArray(result);
      }
    });
  }, [style, discipline, city, province]);

  const findUserFavs = async (userId: string) => {
    const allUserFavs = utils.favs.getAllForUser.fetch({ userId });
    const userFavIds = (await allUserFavs).map((element) => {
      if (element.ftProgramId) {
        return element.ftProgramId;
      }
      if (element.ptProgramId) {
        return element.ptProgramId;
      }
    });
    return userFavIds;
  };

  useEffect(() => {
    if (sessionData) {
      findUserFavs(sessionData.user.id).then((result) =>
        result
          ? setUserFavs(result.filter((fav) => fav !== undefined) as string[])
          : setUserFavs([])
      );
    }
  }, [sessionData]);

  const displayArray = itemArray.map((program) => {
    return (
      <ProgramItem
        element={program}
        fav={userFavs?.includes(program.id) || false}
        findUserFavs={findUserFavs}
        setUserFavs={setUserFavs}
      />
    );
  });

  return (
    <div>
      <ProgramDisplayComponent displayArray={displayArray} />
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
