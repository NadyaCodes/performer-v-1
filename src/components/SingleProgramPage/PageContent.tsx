import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { PageContent } from "./SingleProgramPageComponent";
import ProgramItem from "../ProgramFinder/ProgramItem";
import { api } from "@component/utils/api";
import type { ProgramWithType } from "../MyPrograms/MyProgramsComponent";
import type { ProgramWithInfo } from "../ProgramFinder/types";
import type { FavProgram } from "@prisma/client";
import { convertUserFavs } from "../ProgramFinder/helpers";
import SinglePageHeader from "./SinglePageHeader";

export default function PageContent({ programId }: { programId: string }) {
  const { data: sessionData } = useSession();
  const utils = api.useContext();

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
    <div className="flex flex-col items-center justify-center">
      <SinglePageHeader isSignedIn={!!sessionData} />
      <div
        className="m-5 flex flex-col rounded-md opacity-0 mobileMenu:w-9/12 mobileMenu:px-16 mobileMenu:shadow-lg mobileMenu:shadow-cyan-800 2xl:shadow-2xl 2xl:shadow-cyan-800"
        style={{ animation: "fadeInGrow 1s linear forwards" }}
      >
        {allProgramInfo && (
          <div
            className="w-fullopacity-0"
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
      <div className="m-2 -mt-5 flex flex-col items-center mobileMenu:m-7 mobileMenu:flex-row 2xl:mt-16">
        <div
          className="mx-10 mb-3 text-4xl font-bold text-cyan-800 opacity-0"
          style={{ animation: "flyInFadeIn 0.5s linear 3.7s forwards" }}
        >
          What else?
        </div>

        <Link href={"/about"}>
          <button
            className="mb-2 rounded p-3 text-xl font-semibold text-indigo-800 opacity-0 shadow-md shadow-cyan-800 outline hover:shadow-lg hover:shadow-cyan-800 hover:outline-cyan-700 mobileMenu:font-bold"
            style={{ animation: "fadeInGrow 0.7s linear 4.8s forwards" }}
          >
            Get Started Here
          </button>
        </Link>
      </div>
    </div>
  );
}
