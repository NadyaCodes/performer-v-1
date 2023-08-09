import React, { useEffect, useState } from "react";
import { api } from "@component/utils/api";
import { ProgramWithInfo } from "../ProgramSearch/types";
import { ProgramWithType } from "../MyPrograms/MyProgramsComponent";
import ProgramItem from "../ProgramSearch/ProgramItem";
import { useSession } from "next-auth/react";
import LogoTicker from "../About/LogoTicker";
import { arrowUpRightCorner } from "@component/data/svgs";

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
  const [userFavs, setUserFavs] = useState<string[] | null>(null);
  const [loadingFavs, setLoadingFavs] = useState<boolean>(true);
  const [fav, setFav] = useState<null | boolean>(null);
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

  const fetchFavsArray = async (userId: string) => {
    const favsData = await fetchFavsObj(userId);
    const favsArray = favsData.map((element) => {
      return element.id;
    });
    return favsArray;
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

  useEffect(() => {
    if (sessionData) {
      findUserFavs(sessionData.user.id).then((result) =>
        result
          ? setUserFavs(result.filter((fav) => fav !== undefined) as string[])
          : setUserFavs([])
      );
    }
  }, [sessionData]);

  useEffect(() => {
    if (!sessionData) {
      setLoadingFavs(false);
    }
  }, []);

  useEffect(() => {
    if (sessionData) {
      findUserFavs(sessionData.user.id).then((result) => {
        if (result.includes(programObject?.id)) {
          setFav(true);
        } else {
          setFav(false);
        }
      });
    }
  }, [userFavs, sessionData]);

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
        <div
          className="m-10 w-9/12 rounded-sm opacity-0 shadow-2xl shadow-cyan-700"
          style={{ animation: "fadeInGrow 1s linear forwards" }}
        >
          {allProgramInfo && (
            <ProgramItem
              element={allProgramInfo}
              fav={fav}
              findUserFavs={fetchFavsArray}
              setUserFavs={setUserFavs}
              loadingFavs={loadingFavs}
            />
          )}
        </div>
      </div>
    </div>
  );
}
