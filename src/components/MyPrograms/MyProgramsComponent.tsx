import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import { PTProgram, FTProgram } from "@prisma/client";
import { ProgramWithInfo } from "../ProgramSearch/types";
import SingleProgram from "./SingleProgram";
import LoadingLines from "../Loading/LoadingLines";

export type ProgramWithType = {
  id: string;
  schoolLocationId: string;
  website: string;
  discipline: string;
  name?: string;
  type: string;
};

export default function MyProgramsComponent() {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const userId = sessionData?.user.id;

  const [userFavs, setUserFavs] = useState<
    (ProgramWithType | ProgramWithType | undefined)[] | [] | null
  >(null);

  const [displayData, setDisplayData] = useState<ProgramWithInfo[]>([]);
  const [loading, setLoading] = useState(true);

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
          return { ...program, type: "ft" } || undefined;
        }
        if (element.ptProgramId) {
          const program = (await findProgramObject(
            element.ptProgramId
          )) as PTProgram;
          return { ...program, type: "pt" } || undefined;
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

  const programDisplay = displayData.map((element: ProgramWithInfo) => {
    return <SingleProgram program={element} key={element.id} />;
  });

  return (
    <div>
      <h1 className="flex justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-5 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        My Programs
      </h1>
      {loading && (
        <div className="m-20">
          <LoadingLines />
        </div>
      )}
      <div>{programDisplay}</div>
    </div>
  );
}
