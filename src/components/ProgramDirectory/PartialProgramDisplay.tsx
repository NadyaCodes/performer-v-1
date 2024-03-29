import React, { useState, useEffect, useCallback } from "react";
import { api } from "@component/utils/api";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import type { ProgramWithInfo } from "@component/components/ProgramFinder/types";
import LoadingLines from "../Loading/LoadingLines";
import type { FavProgram } from "@prisma/client";
import { convertUserFavs } from "../ProgramFinder/helpers";
import DirectoryScrollArrow from "./DirectoryScrollArrow";

interface ProvinceProgramDisplayProps {
  itemArray: ProgramWithInfo[] | null;
}

const ProgramItem = dynamic(
  () => import("@component/components/ProgramFinder/ProgramItem"),
  {
    ssr: true,
  }
);

const PartialProgramDisplay: React.FC<ProvinceProgramDisplayProps> = ({
  itemArray,
}) => {
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

  return (
    <div className="mt-8 w-10/12">
      <div className="sticky top-10 z-10 h-0 -translate-y-5 place-self-start">
        <DirectoryScrollArrow />
      </div>

      <div className="-mt-12 flex w-full flex-col items-center overflow-x-hidden mobileMenu:mt-0">
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

export default PartialProgramDisplay;
