import React from "react";
import { useState, useEffect } from "react";
import { api } from "@component/utils/api";
import { useSession } from "next-auth/react";
import { ProgramInfoArray } from "@component/pages/[style]/[discipline]/[province]/[city]";

import { provincesFull } from "src/data/constants";
import { ProgramWithInfo } from "@component/components/ProgramSearch/types";
import ProgramItem from "@component/components/ProgramSearch/ProgramItem";

import { stylesFull, disciplinesFull } from "src/data/constants";
import LoadingLines from "../Loading/LoadingLines";

interface ProgramDisplayProps {
  dataObject: {
    style: string;
    discipline?: string;
    city?: string;
    province?: string;
  };
}

const ProgramDisplayComponent: React.FC<ProgramDisplayProps> = ({
  dataObject,
}) => {
  const { style, discipline, city, province } = dataObject;
  const [itemArray, setItemArray] = useState<ProgramWithInfo[] | null>(null);
  const [userFavs, setUserFavs] = useState<string[] | null>(null);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const { data: sessionData } = useSession();

  const utils = api.useContext();

  const titleString = `${stylesFull[style]} ${
    discipline && disciplinesFull[discipline]
  } Programs
  in ${city}, ${province && provincesFull[province]}`;

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

    programArray.sort((a, b) => {
      const nameA = a.schoolObj?.name || "";
      const nameB = b.schoolObj?.name || "";

      return nameA.localeCompare(nameB);
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
    if (sessionData) {
      fetchData({ style, discipline, city, province }).then((result) => {
        if (result) {
          setItemArray(result);
        }
      });
    }
  }, [sessionData]);

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
    setLoadingFavs(false);
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

  const displayArray = itemArray?.map((program) => {
    return (
      <ProgramItem
        element={program}
        fav={userFavs?.includes(program.id) || false}
        findUserFavs={findUserFavs}
        setUserFavs={setUserFavs}
        loadingFavs={loadingFavs}
      />
    );
  });

  return (
    <div>
      <h1 className="flex justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-10 text-5xl font-extrabold capitalize text-white sm:text-[3rem]">
        {titleString}
      </h1>
      {itemArray ? (
        displayArray
      ) : (
        <div className="m-20">
          <LoadingLines />
        </div>
      )}
    </div>
  );
};

export default ProgramDisplayComponent;
