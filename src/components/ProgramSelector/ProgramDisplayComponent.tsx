import React from "react";
import { useState, useEffect } from "react";
import { api } from "@component/utils/api";
import { useSession } from "next-auth/react";
import { ProgramInfoArray } from "@component/pages/[style]/[discipline]/[province]/[city]";

import { provincesFull } from "src/data/constants";
import { ProgramWithInfo } from "@component/components/ProgramFinder/types";
import ProgramItem from "@component/components/ProgramFinder/ProgramItem";

import { stylesFull, disciplinesFull } from "src/data/constants";
import LoadingLines from "../Loading/LoadingLines";
import Link from "next/link";
import { backChevron } from "@component/data/svgs";
import { FavProgram } from "@prisma/client";
import { convertUserFavs } from "../ProgramFinder/helpers";
import TitleHeader from "./TitleHeader";
import SubHeader from "./SubHeader";
import { number } from "zod";

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
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [userFavsObject, setUserFavsObject] = useState<FavProgram[] | null>(
    null
  );
  const [favProgramIdsArray, setFavProgramIdsArray] = useState<string[] | null>(
    null
  );

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
    fetchData({ style, discipline, city, province }).then((result) => {
      if (result) {
        setItemArray(result);
      }
    });
  }, []);

  useEffect(() => {
    if (sessionData) {
      fetchFavsObj(sessionData?.user.id).then(
        (result) => result && setUserFavsObject(result)
      );
    } else {
      setLoadingFavs(false);
    }
  }, [sessionData]);

  const fetchFavsObj = async (userId: string) => {
    return await utils.favs.getAllForUser.fetch({ userId });
  };

  useEffect(() => {
    if (userFavsObject) {
      const newArray = convertUserFavs(userFavsObject);
      newArray.filter((element) => element !== undefined);
      setFavProgramIdsArray([...newArray] as string[]);
      setLoadingFavs(false);
    } else {
      setLoadingFavs(false);
    }
  }, [userFavsObject]);

  const displayArray = itemArray?.map((program) => {
    return (
      <ProgramItem
        key={program.id}
        element={program}
        fetchUserFavsObject={fetchFavsObj}
        favesObject={userFavsObject}
        setFavesObject={setUserFavsObject}
        favProgramIdsArray={favProgramIdsArray}
        loadingFavs={loadingFavs}
      />
    );
  });

  const createSubheadingText = (num: number) => {
    if (num === 1) {
      return "1 Matching Program";
    }
    if (num > 1) {
      return `${num} Matching Programs`;
    }
    return "There are no matching programs. Please try again.";
  };

  return (
    <div className="flex flex-col items-center">
      <TitleHeader titleString={titleString} />
      <div className="mb-5 bg-cyan-950"></div>
      {itemArray && itemArray.length > 0 && (
        <SubHeader text={createSubheadingText(itemArray.length)} />
      )}
      <Link
        href={`/${style}/${discipline}/${province}/select-next`}
        className="mt-3 w-screen p-2 opacity-0"
        style={{ animation: "fadeIn 1s linear 2.5s forwards" }}
      >
        <button className="flex w-fit px-10 font-semibold text-cyan-800 hover:scale-110">
          <span>{backChevron}</span>
          <span>Change City</span>
        </button>
      </Link>
      {itemArray ? (
        <div
          className="w-8/12 opacity-0"
          style={{ animation: "fadeIn 1s linear 2s forwards" }}
        >
          {displayArray}
        </div>
      ) : (
        <div className="m-20">
          <LoadingLines />
        </div>
      )}
    </div>
  );
};

export default ProgramDisplayComponent;
