import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProgramItem from "../ProgramFinder/ProgramItem";
import { api } from "@component/utils/api";
import type { ProgramWithType } from "../MyPrograms/MyProgramsComponent";
import type { ProgramWithInfo } from "../ProgramFinder/types";
import type { FavProgram } from "@prisma/client";
import { convertUserFavs } from "../ProgramFinder/helpers";
import SinglePageHeader from "./SinglePageHeader";
import ShockFace from "./ShockFace";

export default function PageContent({
  programObject,
}: {
  programObject: ProgramWithType | null;
}) {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const userId = sessionData?.user.id || null;
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

  const schoolLocId = programObject?.schoolLocationId || "na";

  const fetchSchoolLoc = useCallback(async () => {
    if (schoolLocId !== "na") {
      return await utils.schoolLocation.getOneByIdPlusInfo.fetch({
        id: schoolLocId,
      });
    }
    return null;
  }, [utils.schoolLocation.getOneByIdPlusInfo, schoolLocId]);

  const fetchSchoolLocRef = useRef(fetchSchoolLoc);

  useEffect(() => {
    fetchSchoolLocRef.current = fetchSchoolLoc;
  }, [fetchSchoolLoc]);

  const [updatedProgramInfo, setUpdatedProgramInfo] =
    useState<ProgramWithInfo | null>(null);

  useEffect(() => {
    if (programObject && schoolLocId !== "na") {
      const fetchData = async () => {
        try {
          const data = await fetchSchoolLocRef.current();
          if (data) {
            const updatedInfo = {
              id: programObject.id,
              schoolLocationId: programObject.schoolLocationId,
              website: programObject.website || data.website,
              discipline: programObject.discipline,
              name: programObject.name,
              type: programObject.type,
              cityObj: { ...data.location },
              schoolObj: { ...data.school },
              elevatorPitch: programObject.elevatorPitch,
              articlePitch: programObject.articlePitch,
            };
            setUpdatedProgramInfo(updatedInfo);
          }
        } catch (error) {
          console.error("Error fetching SchoolLoc: ", error);
        }
      };

      fetchData().catch((error) =>
        console.error("Error fetching program info: ", error)
      );
    }
  }, [programObject, schoolLocId]);

  useEffect(() => {
    if (updatedProgramInfo) {
      setAllProgramInfo(updatedProgramInfo);
    }
  }, [updatedProgramInfo]);

  useEffect(() => {
    if (!sessionData) {
      setLoadingFavs(false);
    }
  }, [sessionData]);

  const fetchFavsObj = useCallback(async () => {
    if (userId) {
      return await utils.favs.getAllForUser.fetch({ userId });
    }
    return null;
  }, [utils.favs.getAllForUser, userId]);

  const fetchFavsObjRef = useRef(fetchFavsObj);

  useEffect(() => {
    fetchFavsObjRef.current = fetchFavsObj;
  }, [fetchFavsObj]);

  useEffect(() => {
    if (userId) {
      fetchFavsObjRef
        .current()
        .then((result) => result && setUserFavsObject(result))
        .catch((error) => console.error("Error fetching FavsObj: ", error));
    } else {
      setLoadingFavs(false);
    }
  }, [userId]);

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
      {programObject && schoolLocId !== "na" ? (
        <>
          <SinglePageHeader isSignedIn={!!userId} />
          <div
            className="m-5 flex flex-col rounded-md opacity-0 mobileMenu:w-9/12 mobileMenu:px-16 mobileMenu:shadow-lg mobileMenu:shadow-cyan-800 2xl:shadow-2xl 2xl:shadow-cyan-800"
            style={{ animation: "fadeInGrow 1s linear forwards" }}
          >
            {allProgramInfo && (
              <div className="w-fullopacity-0">
                <ProgramItem
                  key={allProgramInfo.id}
                  element={allProgramInfo}
                  fetchUserFavsObject={fetchFavsObj}
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
              style={{ animation: "flyInFadeIn 0.5s linear 3s forwards" }}
            >
              What else?
            </div>

            <Link href={"/about"}>
              <button
                className="mb-2 rounded p-3 text-xl font-semibold text-indigo-800 opacity-0 shadow-md shadow-cyan-800 outline hover:shadow-lg hover:shadow-cyan-800 hover:outline-cyan-700 mobileMenu:font-bold"
                style={{ animation: "fadeInGrow 0.7s linear 3.8s forwards" }}
              >
                Get Started Here
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="m-0 flex w-11/12 flex-col justify-center text-center text-3xl font-bold text-cyan-900 mobileMenu:m-6 mobileMenu:w-9/12 mobileMenu:text-4xl xl:text-5xl 3xl:p-5">
          <div>Uh oh!</div>
          <ShockFace />
          <div className="text-2xl">
            We can&apos;t find the program you&apos;re looking for...
          </div>
          <Link
            href={"/program-finder"}
            className="m-5 mt-10 w-fit place-self-center rounded-md border-2 border-indigo-800 p-4 text-xl text-indigo-900 hover:scale-110"
          >
            LOOK FOR IT HERE
          </Link>
        </div>
      )}
    </div>
  );
}
