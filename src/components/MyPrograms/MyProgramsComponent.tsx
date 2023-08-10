import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import { PTProgram, FTProgram, CustomProgram } from "@prisma/client";
import { ProgramWithInfo } from "../ProgramFinder/types";
import SingleProgram from "./SingleProgram";
import LoadingLines from "../Loading/LoadingLines";
import { backArrow, plusIcon, sparkles } from "@component/data/svgs";
import SingleCustom from "./SingleCustom";
import CustomProgramForm from "./CustomProgramForm";

export type ProgramWithType = {
  id: string;
  schoolLocationId: string;
  website: string;
  discipline: string;
  name?: string;
  type: string;
  favProgramId?: string;
};

export default function MyProgramsComponent() {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const userId = sessionData?.user.id;

  const [userFavs, setUserFavs] = useState<
    (ProgramWithType | ProgramWithType | undefined)[] | [] | null
  >(null);

  const [displayData, setDisplayData] = useState<ProgramWithInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showUpdateCustom, setShowUpdateCustom] = useState<
    boolean | CustomProgram
  >(false);
  const [displayCustom, setDisplayCustom] = useState<CustomProgram[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<boolean | string>(false);

  const findProgramObject = async (id: string) => {
    if (userId) {
      const ptProgramObject = await utils.ptProgram.getOneById.fetch({ id });
      const ftProgramObject = await utils.ftProgram.getOneById.fetch({ id });
      if (ftProgramObject) {
        return ftProgramObject;
      }
      if (ptProgramObject) {
        return ptProgramObject;
      }
    }
  };

  const findUserFavs = async (userId: string) => {
    const allUserFavs = utils.favs.getAllForUser.fetch({ userId });
    const userFavPrograms: (ProgramWithType | undefined)[] = await Promise.all(
      (
        await allUserFavs
      ).map(async (element) => {
        if (element.ftProgramId) {
          const program = (await findProgramObject(
            element.ftProgramId
          )) as FTProgram;
          return (
            { ...program, type: "ft", favProgramId: element.id } || undefined
          );
        }
        if (element.ptProgramId) {
          const program = (await findProgramObject(
            element.ptProgramId
          )) as PTProgram;
          return (
            { ...program, type: "pt", favProgramId: element.id } || undefined
          );
        }
        return undefined;
      })
    );
    return userFavPrograms;
  };

  const findSchoolLocationObject = async (id: string) => {
    const schoolLocationObject = await utils.schoolLocation.getOneById.fetch({
      id,
    });
    return schoolLocationObject;
  };

  const findSchool = async (id: string) => {
    const schoolLocationObject = await utils.school.getOneById.fetch({ id });
    return schoolLocationObject;
  };

  const findLocation = async (id: string) => {
    const locationObject = await utils.location.getOneById.fetch({ id });
    return locationObject;
  };

  useEffect(() => {
    if (sessionData) {
      findUserFavs(sessionData.user.id).then((result) => {
        result ? setUserFavs(result) : setUserFavs([]);
      });
    }
  }, [sessionData]);

  useEffect(() => {
    const fetchDisplayData = async () => {
      if (userFavs && userFavs.length > 0) {
        const newData = await Promise.all(
          userFavs.map(async (element) => {
            if (element) {
              const result = await findSchoolLocationObject(
                element.schoolLocationId
              );
              if (result) {
                const schoolObject = await findSchool(result.schoolId);
                const locationObject = await findLocation(result.locationId);
                return {
                  id: element.id,
                  schoolLocationId: element.schoolLocationId,
                  website: element.website,
                  discipline: element.discipline,
                  name: element.name,
                  type: element.type,
                  cityObj: locationObject,
                  schoolObj: schoolObject,
                  favId: element.favProgramId,
                };
              }
            }
            return undefined;
          })
        );
        newData.sort((a, b) => {
          const nameA = a?.schoolObj?.name || "";
          const nameB = b?.schoolObj?.name || "";

          return nameA.localeCompare(nameB);
        });

        setDisplayData(
          newData.filter((item) => item !== undefined) as ProgramWithInfo[]
        );
        findCustomPrograms()
          .then((data) => data && setDisplayCustom(data))
          .then(() => setLoading(false));
      }
    };

    fetchDisplayData();
  }, [userFavs]);

  useEffect(() => {
    setLoadingDelete(false);
  }, [displayData, displayCustom]);

  const findCustomPrograms = async () => {
    if (userId) {
      const allCustomPrograms = await utils.customProgram.getAllForUser.fetch({
        userId,
      });
      return allCustomPrograms;
    }
  };

  const programDisplay = displayData.map((element: ProgramWithInfo) => {
    return (
      <SingleProgram
        program={element}
        key={element.id}
        loadingDelete={loadingDelete}
        setLoadingDelete={setLoadingDelete}
        findUserFavs={findUserFavs}
        setUserFavs={setUserFavs}
      />
    );
  });

  const customProgramDisplay = displayCustom.map((element) => {
    return (
      <SingleCustom
        program={element}
        key={element.id}
        setDisplayCustom={setDisplayCustom}
        setShowUpdateCustom={setShowUpdateCustom}
        loadingDelete={loadingDelete}
        setLoadingDelete={setLoadingDelete}
      />
    );
  });

  return (
    <div className="mb-10 flex flex-col items-center">
      <div
        className="absolute left-0 right-0 h-10 bg-cyan-950"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
        }}
      ></div>
      <div className="h-10"></div>

      <h2 className="m-5 flex  w-7/12  items-center justify-center bg-cyan-50  text-center  text-4xl font-extrabold capitalize tracking-tight text-cyan-900">
        <div style={{ animation: "wiggle 1s linear" }}>
          <div style={{ animation: "fadeInGrow 1s linear" }}>
            <div className="m-2">{sparkles}</div>
          </div>
        </div>
        <div className="m-2">Saved Programs</div>
        <div style={{ animation: "wiggle 1s linear" }}>
          <div style={{ animation: "fadeInGrow 1s linear" }}>
            <div className="m-2 -scale-x-100">{sparkles}</div>
          </div>
        </div>
      </h2>
      <div
        className="h-1 w-2/3 justify-center rounded-full bg-gradient-to-b from-cyan-300 to-cyan-900 text-cyan-950 opacity-0 shadow-lg shadow-cyan-900"
        style={{ animation: "flyInFadeIn 0.5s linear 2s forwards" }}
      ></div>
      <div className="h-10"></div>

      {loading ? (
        <div>
          <LoadingLines />
        </div>
      ) : showUpdateCustom !== false ? (
        <div className="w-8/12 place-self-center">
          <CustomProgramForm
            setShowUpdateCustom={setShowUpdateCustom}
            findCustomPrograms={findCustomPrograms}
            setDisplayCustom={setDisplayCustom}
            currentProgram={showUpdateCustom === true ? null : showUpdateCustom}
          />
        </div>
      ) : (
        <div className="-mt-10 flex w-full flex-col items-center justify-center">
          <div className="w-7/12">{programDisplay}</div>

          <h2 className="text-5xl font-extrabold capitalize tracking-tight text-gray-800 sm:text-[3rem]">
            Custom Programs
          </h2>
          <button
            onClick={() => {
              setShowUpdateCustom(!showUpdateCustom);
              window.scrollTo({
                top: 290,
                behavior: "smooth",
              });
            }}
            className="mr-8 flex w-56 place-items-center justify-between place-self-end  rounded  border-2 border-transparent bg-transparent px-4 py-2 font-semibold  text-cyan-600 hover:scale-110 hover:border-2 hover:bg-cyan-50"
            style={{ zIndex: "10" }}
          >
            <span>Add Custom Program </span>
            <span>{plusIcon}</span>
          </button>
          <div className="w-7/12">{customProgramDisplay}</div>
        </div>
      )}
      {showUpdateCustom && (
        <button
          onClick={() => setShowUpdateCustom(!showUpdateCustom)}
          className="m-4 flex w-32 place-items-center justify-between place-self-end rounded border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-600 outline hover:border-transparent hover:bg-blue-500 hover:text-white"
        >
          <div>Back </div>
          <div>{backArrow}</div>
        </button>
      )}
    </div>
  );
}
