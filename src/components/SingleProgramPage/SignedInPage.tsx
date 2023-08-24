import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { arrowUpRightCorner, arrowUp } from "@component/data/svgs";
import Link from "next/link";
import { PageContent } from "./SingleProgramPageComponent";
import ProgramItem from "../ProgramFinder/ProgramItem";
import { api } from "@component/utils/api";
import { ProgramWithType } from "../MyPrograms/MyProgramsComponent";
import { ProgramWithInfo } from "../ProgramFinder/types";
import { FavProgram } from "@prisma/client";
import { convertUserFavs } from "../ProgramFinder/helpers";

export default function PageContent({ programId }: { programId: string }) {
  const { data: sessionData } = useSession();
  const utils = api.useContext();

  const textHeader = sessionData
    ? "Add to faves by clicking the star"
    : "Sign in to Save Program";

  const [programObject, setProgramObject] = useState<ProgramWithType | null>(
    null
  );
  const [allProgramInfo, setAllProgramInfo] = useState<ProgramWithInfo | null>(
    null
  );
  const [userFavsObject, setUserFavsObject] = useState<FavProgram[] | null>(
    null
  );
  const [loadingFavs, setLoadingFavs] = useState<boolean>(true);
  const [favProgramIdsArray, setFavProgramIdsArray] = useState<string[] | null>(
    null
  );

  const fetchFTProgram = async () => {
    return await utils.ftProgram.getOneByIdPlusInfo.fetch({ id: programId });
  };

  const fetchPTProgram = async () => {
    return await utils.ptProgram.getOneByIdPlusInfo.fetch({ id: programId });
  };

  const fetchSchoolLoc = async (id: string) => {
    return await utils.schoolLocation.getOneByIdPlusInfo.fetch({ id });
  };

  const fetchFavsObj = async (userId: string) => {
    return await utils.favs.getAllForUser.fetch({ userId });
  };

  useEffect(() => {
    fetchFTProgram()
      .then((ftData) => {
        if (ftData) {
          setProgramObject({ ...ftData, type: "ft" });
        } else {
          fetchPTProgram()
            .then((ptData) => {
              if (ptData) {
                setProgramObject({ ...ptData, type: "pt" });
              }
            })
            .catch((error) =>
              console.error("Error fetching PTProgram: ", error)
            );
        }
      })
      .catch((error) => console.error("error fetching FTProgram: ", error));
  }, []);

  useEffect(() => {
    if (programObject) {
      fetchSchoolLoc(programObject?.schoolLocationId)
        .then((data) => {
          if (data) {
            const allInfo = {
              id: programObject.id,
              schoolLocationId: programObject.schoolLocationId,
              website: programObject.website || data.website,
              discipline: programObject.discipline,
              name: programObject.name,
              type: programObject.type,
              cityObj: { ...data.location },
              schoolObj: { ...data.school },
            };
            setAllProgramInfo(allInfo);
          }
        })
        .catch((error) => console.error("Error fetching SchoolLoc: ", error));
    }
  }, [programObject]);

  useEffect(() => {
    if (!sessionData) {
      setLoadingFavs(false);
    }
  }, []);

  useEffect(() => {
    if (sessionData) {
      fetchFavsObj(sessionData?.user.id)
        .then((result) => result && setUserFavsObject(result))
        .catch((error) => console.error("Error fetching FavsObj: ", error));
    } else {
      setLoadingFavs(false);
    }
  }, [sessionData]);

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

  return (
    <div className="flex flex-col items-center justify-center">
      {!sessionData && (
        <div
          className="flex flex-col  text-center text-3xl font-extrabold text-cyan-900 opacity-0 mobileMenu:flex-row mobileMenu:text-4xl"
          style={{ animation: "expandUp 1s linear 1.5s forwards" }}
        >
          <div className="-mb-16 mobileMenu:mb-0">{textHeader}</div>

          <div
            className="ml-3 hidden w-fit rotate-12 place-self-end opacity-0 mobileMenu:block"
            style={{ animation: "fadeIn 1s linear 2s forwards" }}
          >
            {arrowUpRightCorner}
          </div>
          <div className="mr-7 w-fit translate-y-8 scale-150 place-self-end mobileMenu:hidden">
            <div
              className="opacity-0"
              style={{ animation: "fadeInTranslate 1s linear 2s forwards" }}
            >
              {arrowUp}
            </div>
          </div>
        </div>
      )}
      {sessionData && (
        <div className="flex flex-col text-center text-3xl font-extrabold text-cyan-900 mobileMenu:text-4xl">
          <div
            className="m-1 opacity-0"
            style={{ animation: "expandUp 0.7s linear 1.5s forwards" }}
          >
            {textHeader}
          </div>
        </div>
      )}
      <div
        className="m-5 flex flex-col rounded-sm opacity-0 shadow-cyan-700 mobileMenu:w-9/12 mobileMenu:shadow-xl"
        style={{ animation: "fadeInGrow 1s linear forwards" }}
      >
        {sessionData && (
          <>
            <div className="hidden translate-x-10 place-self-end mobileMenu:block">
              <div
                className="h-0 w-fit rotate-180 justify-items-end text-cyan-900 opacity-0"
                style={{ animation: "fadeIn 1s linear 2.3s forwards" }}
              >
                {arrowUpRightCorner}
              </div>
            </div>
            <div
              className="-translate-x-2 translate-y-10 rotate-180 scale-125 place-self-end opacity-0"
              style={{ animation: "fadeIn 1s linear 2.3s forwards" }}
            >
              <div
                className="w-fittext-cyan-900 h-0 text-cyan-900"
                style={{
                  animation: "upDown 1s linear 2s 2 forwards",
                  opacity: "inherit",
                }}
              >
                {arrowUp}
              </div>
            </div>
          </>
        )}
        {allProgramInfo && (
          <div
            className="opacity-0"
            style={{ animation: "fadeInGrow 0.5s linear forwards" }}
          >
            <ProgramItem
              key={allProgramInfo.id}
              element={allProgramInfo}
              fetchUserFavsObject={fetchFavsObj}
              favesObject={userFavsObject}
              setFavesObject={setUserFavsObject}
              favProgramIdsArray={favProgramIdsArray}
              loadingFavs={loadingFavs}
            />
          </div>
        )}
      </div>
      <div className="m-2 -mt-5 flex flex-col items-center mobileMenu:m-7 mobileMenu:mt-0 mobileMenu:flex-row">
        <div
          className="mx-10 mb-3 text-4xl font-bold text-cyan-800 opacity-0"
          style={{ animation: "flyInFadeIn 0.5s linear 3.3s forwards" }}
        >
          Now what?
        </div>

        <Link href={"/about"}>
          <button
            className="mb-2 rounded p-3 text-xl font-semibold text-indigo-800 opacity-0 shadow-md shadow-cyan-800 outline hover:shadow-lg hover:shadow-cyan-800 hover:outline-cyan-700 mobileMenu:font-extrabold"
            style={{ animation: "fadeInGrow 1s linear 4s forwards" }}
          >
            Get Started Here
          </button>
        </Link>
      </div>
    </div>
  );
}
