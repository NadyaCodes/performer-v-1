import React, { useState, useEffect, useCallback } from "react";
import { api } from "@component/utils/api";
import { useSession } from "next-auth/react";
import type { ProgramInfoArray } from "@component/pages/[style]/[discipline]/[province]/[city]";

import { provincesFull } from "src/data/constants";
import type { ProgramWithInfo } from "@component/components/ProgramFinder/types";
import ProgramItem from "@component/components/ProgramFinder/ProgramItem";

import { stylesFull, disciplinesFull } from "src/data/constants";
import LoadingLines from "../Loading/LoadingLines";
import Link from "next/link";
import { backChevron } from "@component/data/svgs";
import type { FavProgram } from "@prisma/client";
import { convertUserFavs } from "../ProgramFinder/helpers";
import TitleHeader from "./TitleHeader";
import SubHeader from "./SubHeader";
import DirectoryScrollArrow from "./DirectoryScrollArrow";
import { useEffectOnce } from "../AddProgramResult/helpers";

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
  const [starPopUp, setStarPopUp] = useState<string>("");

  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id || null;

  const utils = api.useContext();

  const styleText = stylesFull[style] || "";
  const disciplineText = (discipline && disciplinesFull[discipline]) || "";
  let locationArray = [city || "", (province && provincesFull[province]) || ""];
  locationArray = locationArray.filter((item) => item !== "");
  const locationString = locationArray.join(", ");

  const titleString = `${styleText} ${disciplineText} Programs
  in ${locationString}`;

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
              articlePitch: program.articlePitch || "",
              elevatorPitch: program.elevatorPitch || "",
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
              type: "ft",
              name: program.name,
              cityObj: element.location,
              schoolObj: element.school,
              articlePitch: program.articlePitch || "",
              elevatorPitch: program.elevatorPitch || "",
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

  useEffectOnce(() => {
    fetchData({ style, discipline, city, province })
      .then((result) => {
        if (result) {
          setItemArray(result);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  });

  const useFetchFavsObjCB = () => {
    const fetchFavsObjCB = useCallback(async (userId: string) => {
      return await utils.favs.getAllForUser.fetch({ userId });
    }, []);
    return fetchFavsObjCB;
  };

  const fetchFavsObjHook = useFetchFavsObjCB();

  useEffect(() => {
    if (userId) {
      fetchFavsObjHook(userId)
        .then((result) => {
          if (result) {
            setUserFavsObject(result);
          }
        })
        .catch((error) => console.error("Error fetching favs: ", error));
    } else {
      setLoadingFavs(false);
    }
  }, [userId, fetchFavsObjHook]);

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

  const memoizedSetStarPopUp = useCallback<
    React.Dispatch<React.SetStateAction<string>>
  >((newValue: string | ((prevState: string) => string)) => {
    setStarPopUp(newValue);
  }, []);

  const displayArray = itemArray?.map((program) => {
    return (
      <ProgramItem
        key={program.id}
        element={program}
        fetchUserFavsObject={fetchFavsObj}
        setFavesObject={setUserFavsObject}
        favProgramIdsArray={favProgramIdsArray}
        loadingFavs={loadingFavs}
        setStarPopUp={memoizedSetStarPopUp}
        starPopUp={starPopUp}
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
    <div className="">
      <div className="sticky top-10 z-10 h-0 place-self-start">
        <DirectoryScrollArrow />
      </div>

      <div className="-mt-12 flex w-full flex-col items-center overflow-x-hidden mobileMenu:mt-0">
        <TitleHeader titleString={titleString} />
        <div className="mt-86 pt-20 xxs:mt-72 xs:mt-52 sm:mt-40 mobileMenu:hidden"></div>

        {itemArray && itemArray.length > 0 && (
          <SubHeader text={createSubheadingText(itemArray.length)} />
        )}

        <Link
          href={`/${style}/${discipline || "act"}/${
            province || "ontario"
          }/select-next`}
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
            className="-mt-8 h-fit w-11/12 opacity-0 mobileMenu:mt-0"
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
    </div>
  );
};

export default ProgramDisplayComponent;
