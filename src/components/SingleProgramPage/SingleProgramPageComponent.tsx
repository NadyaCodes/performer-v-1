import React, { useEffect, useState } from "react";
import { api } from "@component/utils/api";
import { ProgramWithInfo } from "../ProgramFinder/types";
import { ProgramWithType } from "../MyPrograms/MyProgramsComponent";
import ProgramItem from "../ProgramFinder/ProgramItem";
import { useSession } from "next-auth/react";
import { arrowUpRightCorner } from "@component/data/svgs";
import Link from "next/link";
import { FavProgram } from "@prisma/client";
import { convertUserFavs } from "../ProgramFinder/helpers";

export default function SingleProgramPageComponent({
  programid,
}: {
  programid: string;
}) {
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
  const utils = api.useContext();
  const { data: sessionData } = useSession();

  const fetchFTProgram = async () => {
    return await utils.ftProgram.getOneByIdPlusInfo.fetch({ id: programid });
  };

  const fetchPTProgram = async () => {
    return await utils.ptProgram.getOneByIdPlusInfo.fetch({ id: programid });
  };

  const fetchSchoolLoc = async (id: string) => {
    return await utils.schoolLocation.getOneByIdPlusInfo.fetch({ id });
  };

  const fetchFavsObj = async (userId: string) => {
    return await utils.favs.getAllForUser.fetch({ userId });
  };

  useEffect(() => {
    fetchFTProgram().then((ftData) => {
      if (ftData) {
        setProgramObject({ ...ftData, type: "ft" });
      } else {
        fetchPTProgram().then((ptData) => {
          if (ptData) {
            setProgramObject({ ...ptData, type: "pt" });
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (programObject) {
      fetchSchoolLoc(programObject?.schoolLocationId).then((data) => {
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
      });
    }
  }, [programObject]);

  useEffect(() => {
    if (!sessionData) {
      setLoadingFavs(false);
    }
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
    <div>
      <div>
        <div
          className="absolute left-0 right-0 h-10"
          style={{
            boxShadow:
              "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
          }}
        ></div>
        <div className="mb-10 h-10 bg-cyan-950"></div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {!sessionData && (
          <div
            className="flex text-center text-4xl font-extrabold text-cyan-900 opacity-0"
            style={{ animation: "expandUp 1s linear 1s forwards" }}
          >
            <div>Sign in to save program</div>

            <div
              className=" ml-3 rotate-12 opacity-0"
              style={{ animation: "fadeIn 1s linear 2s forwards" }}
            >
              {arrowUpRightCorner}
            </div>
          </div>
        )}
        {sessionData && (
          <div className="flex flex-col text-center text-4xl font-extrabold text-cyan-900">
            <div
              className="m-1 opacity-0"
              style={{ animation: "expandUp 0.7s linear 1s forwards" }}
            >
              Add to faves by clicking the star
            </div>
          </div>
        )}
        <div
          className="m-5 flex w-9/12 flex-col rounded-sm opacity-0 shadow-xl shadow-cyan-700"
          style={{ animation: "fadeInGrow 1s linear forwards" }}
        >
          {sessionData && (
            <div className="translate-x-10 place-self-end">
              <div
                className="h-0 w-fit rotate-180 justify-items-end text-cyan-900 opacity-0"
                style={{ animation: "fadeIn 1s linear 2s forwards" }}
              >
                {arrowUpRightCorner}
              </div>
            </div>
          )}
          {allProgramInfo && (
            <ProgramItem
              key={allProgramInfo.id}
              element={allProgramInfo}
              fetchUserFavsObject={fetchFavsObj}
              favesObject={userFavsObject}
              setFavesObject={setUserFavsObject}
              favProgramIdsArray={favProgramIdsArray}
              loadingFavs={loadingFavs}
            />
          )}
        </div>
        <div className="m-7 flex items-center">
          <div
            className="mx-10 text-4xl font-bold text-cyan-800 opacity-0"
            style={{ animation: "flyInFadeIn 1s linear 3s forwards" }}
          >
            Now what?
          </div>

          <Link href={"/about"}>
            <button
              className="rounded p-3 text-xl font-extrabold text-indigo-800 opacity-0 shadow-md shadow-cyan-800 outline hover:shadow-lg hover:shadow-cyan-800 hover:outline-cyan-700"
              style={{ animation: "fadeInGrow 1s linear 5s forwards" }}
            >
              Get Started Here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
