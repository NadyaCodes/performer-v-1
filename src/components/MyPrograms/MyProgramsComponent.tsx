import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import { PTProgram, FTProgram, CustomProgram } from "@prisma/client";
import { ProgramWithInfo } from "../ProgramSearch/types";
import SingleProgram from "./SingleProgram";
import LoadingLines from "../Loading/LoadingLines";
import { backArrow, plusIcon } from "@component/data/svgs";
import NewCustomProgram from "./NewCustomProgram";
import SingleCustom from "./SingleCustom";

export type ProgramWithType = {
  id: string;
  schoolLocationId: string;
  website: string;
  discipline: string;
  name?: string;
  type: string;
  favProgramId: string;
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
  const [showAddProgram, setShowAddProgram] = useState<boolean>(false);
  const [displayCustom, setDisplayCustom] = useState<CustomProgram[]>([]);

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

        // Filter out undefined elements and set the displayData state
        setDisplayData(
          newData.filter((item) => item !== undefined) as ProgramWithInfo[]
        );
        setLoading(false);
      }
    };

    fetchDisplayData();
  }, [userFavs]);

  const findCustomPrograms = async () => {
    if (userId) {
      const allCustomPrograms = await utils.customProgram.getAllForUser.fetch({
        userId,
      });
      return allCustomPrograms;
    }
  };

  useEffect(() => {
    findCustomPrograms().then((data) => data && setDisplayCustom(data));
  }, [userId]);

  const programDisplay = displayData.map((element: ProgramWithInfo) => {
    return <SingleProgram program={element} key={element.id} />;
  });

  const customProgramDisplay = displayCustom.map((element) => {
    return (
      <SingleCustom
        program={element}
        key={element.id}
        findCustomPrograms={findCustomPrograms}
        setDisplayCustom={setDisplayCustom}
      />
    );
  });

  return (
    <div className="flex flex-col">
      <h1 className="flex justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-5 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        My Programs
      </h1>
      {loading && (
        <div className="m-20">
          <LoadingLines />
        </div>
      )}
      {showAddProgram ? (
        <button
          onClick={() => setShowAddProgram(!showAddProgram)}
          className="m-4 flex w-32 place-items-center justify-between place-self-end rounded border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-600 outline hover:border-transparent hover:bg-blue-500 hover:text-white"
        >
          <div>Back </div>
          <div>{backArrow}</div>
        </button>
      ) : (
        <button
          onClick={() => setShowAddProgram(!showAddProgram)}
          className="m-4 flex w-56 place-items-center justify-between place-self-end rounded border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-600 outline hover:border-transparent hover:bg-blue-500 hover:text-white"
          style={{ zIndex: "10" }}
        >
          <span>Add Custom Program </span>
          <span>{plusIcon}</span>
        </button>
      )}
      {/* <button
        onClick={() => setShowAddProgram(!showAddProgram)}
        className=" m-4 flex w-56 place-items-center justify-between place-self-end rounded border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-600 outline hover:border-transparent hover:bg-blue-500 hover:text-white"
      >
        <div>Add Custom Program </div>
        <div>{plusIcon}</div>
      </button> */}

      {showAddProgram ? (
        <div className="w-8/12 place-self-center">
          <NewCustomProgram
            setShowAddProgram={setShowAddProgram}
            findCustomPrograms={findCustomPrograms}
            setDisplayCustom={setDisplayCustom}
          />
        </div>
      ) : (
        <div className="-mt-10">
          <div>{programDisplay}</div>
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-extrabold capitalize tracking-tight text-gray-800 sm:text-[3rem]">
              Custom Programs
            </h2>
            <div className="w-full">{customProgramDisplay}</div>
          </div>
        </div>
      )}
    </div>
  );
}
