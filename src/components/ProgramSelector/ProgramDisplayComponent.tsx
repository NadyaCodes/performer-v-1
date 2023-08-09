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
    fetchData({ style, discipline, city, province }).then((result) => {
      if (result) {
        setItemArray(result);
      }
    });
  }, []);

  useEffect(() => {
    if (sessionData) {
      findUserFavs(sessionData.user.id).then((result) =>
        result
          ? setUserFavs(result.filter((fav) => fav !== undefined) as string[])
          : setUserFavs([])
      );
    } else {
      setLoadingFavs(false);
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

  const fetchFavsObj = async (userId: string) => {
    return await utils.favs.getAllForUser.fetch({ userId });
  };

  const fetchFavsArray = async (userId: string) => {
    const favsData = await fetchFavsObj(userId);
    const favsArray = favsData.map((element) => {
      return element.id;
    });
    return favsArray;
  };

  const [displayArray, setDisplayArray] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    if (sessionData) {
      findUserFavs(sessionData?.user.id).then((result) => {
        const newDisplayArray = itemArray?.map((program) => {
          const isFav = result.includes(program.id);
          return (
            <ProgramItem
              element={program}
              fav={isFav || false}
              findUserFavs={fetchFavsArray}
              setUserFavs={setUserFavs}
              loadingFavs={loadingFavs}
            />
          );
        });
        newDisplayArray && setDisplayArray(newDisplayArray);
      });
    }
  }, [userFavs, itemArray]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-screen bg-cyan-950"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5), inset 0px -8px 16px rgba(0,255,255,0.5)",
        }}
      >
        <h1 className="flex  justify-center p-10 text-center text-5xl font-extrabold capitalize text-cyan-50 sm:text-[3rem]">
          {titleString}
        </h1>
      </div>
      <div className="mb-10 bg-cyan-950"></div>

      <Link
        href={`/${style}/${discipline}/${province}/select-next`}
        className="w-screen p-2"
      >
        <button className="flex w-fit px-10 font-semibold text-cyan-800 hover:scale-110">
          <span>{backChevron}</span>
          <span>Back</span>
        </button>
      </Link>
      {itemArray && itemArray.length > 0 && (
        <div
          className="mt-3 flex w-screen justify-center bg-gradient-to-b from-indigo-100 to-indigo-300 text-cyan-950 shadow-lg shadow-cyan-900"
          style={{ animation: "flyInFadeIn 0.5s linear forwards" }}
        >
          <div
            className="opacity-0"
            style={{ animation: "flyInFadeIn 1s linear 0.6s forwards" }}
          >
            <div
              style={{ animation: "translateUpToDown 1s linear 0.6s forwards" }}
            >
              <div
                className="flex p-5 text-4xl font-bold"
                style={{ animation: "rotateSwell 1s linear 0.6s forwards" }}
              >
                <div className="">{itemArray.length}</div>
                <div className="ml-2">
                  Matching Program{itemArray.length > 1 && "s"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
