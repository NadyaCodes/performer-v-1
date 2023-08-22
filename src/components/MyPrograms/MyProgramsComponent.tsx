import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import { PTProgram, FTProgram, CustomProgram } from "@prisma/client";
import { ProgramWithInfo } from "../ProgramFinder/types";
import SingleProgram from "./SingleProgram";
import LoadingLines from "../Loading/LoadingLines";
import { backChevron, plusIcon } from "@component/data/svgs";
import SingleCustom from "./SingleCustom";
import CustomProgramForm from "./CustomProgramForm";
import H2Title from "./H2Title";
import QuickLinks from "./QuickLinks";
import { ObjectList } from "@component/data/types";
import EmptyFavPrograms from "./EmptyFavPrograms";
import EmptyCustomProgram from "./EmptyCustomProgram";
import ScrollingDivide from "./ScrollingDivide";
import MobileQuickLinks from "./MobileQuickLinks";

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

  const [displayData, setDisplayData] = useState<ProgramWithInfo[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [showUpdateCustom, setShowUpdateCustom] = useState<
    boolean | CustomProgram
  >(false);
  const [displayCustom, setDisplayCustom] = useState<CustomProgram[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<boolean | string>(false);

  const delayStyle = {
    opacity: "0",
    animation: "fadeIn 1s linear 1.5s forwards",
  };

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
      if (userFavs) {
        if (userFavs.length > 0) {
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
        } else {
          setDisplayData(null);
          findCustomPrograms()
            .then((data) => data && setDisplayCustom(data))
            .then(() => setLoading(false));
        }
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

  const [keyValueList, setKeyValueList] = useState<ObjectList[]>([]);

  useEffect(() => {
    const newKeyValueList: ObjectList[] = [];
    newKeyValueList.push({ favsHeader: "-- Saved Programs --", type: "fav" });

    displayData?.forEach((program) => {
      const text =
        program.schoolObj?.name ||
        program.name ||
        program.website ||
        "Unknown Program";
      newKeyValueList.push({ [program.id]: text, type: "fav" });
    });

    newKeyValueList.push({
      customHeader: "-- Custom Programs --",
      type: "custom",
    });

    if (displayCustom.length > 0) {
      displayCustom.forEach((program) => {
        let text = program.school || program.name;
        if (!text) {
          if (program.city) text = `Unknown Program: ${program.city}`;
          else if (program.province)
            text = `Unknown Program: ${program.province}`;
          else if (program.country)
            text = `Unknown Program: ${program.country}`;
          else if (program.website)
            text = `Unknown Program: ${program.website}`;
          else if (program.typeFt) text = "Unknown Program: Full Time";
          else if (program.typePt) text = "Unknown Program: Part Time";
          else if (program.disciplineAct) text = "Unknown Program: Acting";
          else if (program.disciplineSing) text = "Unknown Program: Singing";
          else if (program.disciplineDance) text = "Unknown Program: Dance";
          else if (program.disciplineMT)
            text = "Unknown Program: Musical Theatre";
          else text = "Unknown Program";
        }

        newKeyValueList.push({ [program.id]: text, type: "custom" });
      });
    }

    setKeyValueList(newKeyValueList);
  }, [displayData, displayCustom]);

  const programDisplay = displayData?.map((element: ProgramWithInfo) => {
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

  const addCustomButton = (
    <button
      onClick={() => {
        setShowUpdateCustom(!showUpdateCustom);
        window.scrollTo({
          top: 100,
          behavior: "smooth",
        });
      }}
      className="-mt-3 flex w-56 place-items-center justify-between rounded  px-4  py-2 font-semibold text-indigo-800  opacity-0 hover:scale-110  hover:bg-indigo-900 hover:text-indigo-50"
      style={{ animation: "pullDownTop 0.3s linear 3s forwards" }}
    >
      <span>Add Custom Program </span>
      <span>{plusIcon}</span>
    </button>
  );

  return (
    <div>
      {keyValueList.length > 3 && !showUpdateCustom && (
        <>
          <QuickLinks keyValueList={keyValueList} />
          <MobileQuickLinks keyValueList={keyValueList} />
        </>
      )}

      <div className="static flex min-h-screen flex-col items-center overflow-x-hidden pb-10">
        <div
          className="absolute left-0 right-0 hidden h-10 bg-cyan-950 mobileMenu:block"
          style={{
            boxShadow:
              "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
          }}
        ></div>
        {loadingDelete && (
          <div
            className="fixed inset-0 z-10 transition-all"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
            }}
          ></div>
        )}
        <div className="h-60 mobileMenu:h-20"></div>
        {showUpdateCustom && !loading && (
          <div className="w-2/3">
            <button
              className="flex font-semibold text-indigo-900 hover:scale-110 hover:text-indigo-800"
              onClick={() => setShowUpdateCustom(!showUpdateCustom)}
            >
              <span>{backChevron}</span>
              <span>Back</span>
            </button>
          </div>
        )}

        {!showUpdateCustom && (
          <H2Title text="Saved Programs" icon="star" id="favsHeader" />
        )}

        {loading && (
          <div>
            <LoadingLines />
          </div>
        )}

        {!showUpdateCustom && !loading && (
          <div className="-mt-16 flex w-full flex-col items-center justify-center">
            {programDisplay && programDisplay.length > 0 ? (
              <div className="w-7/12">{programDisplay}</div>
            ) : (
              <div className="mt-10 w-7/12">
                <EmptyFavPrograms />
              </div>
            )}
            <ScrollingDivide />
            <H2Title
              text="Custom Programs"
              icon="sparkle"
              style={delayStyle}
              id="customHeader"
              color="indigo"
            />
            {addCustomButton}
            {customProgramDisplay.length > 0 ? (
              <div className="w-7/12">{customProgramDisplay}</div>
            ) : (
              <div className="w-7/12 text-center italic">
                <EmptyCustomProgram />
              </div>
            )}
          </div>
        )}

        {showUpdateCustom && !loading && (
          <div className="w-8/12 place-self-center">
            <CustomProgramForm
              setShowUpdateCustom={setShowUpdateCustom}
              findCustomPrograms={findCustomPrograms}
              setDisplayCustom={setDisplayCustom}
              currentProgram={
                showUpdateCustom === true ? null : showUpdateCustom
              }
            />
          </div>
        )}
        {showUpdateCustom && !loading && (
          <div className="flex w-2/3 justify-end">
            <button
              className="flex font-semibold text-indigo-900 hover:scale-110 hover:text-indigo-800"
              onClick={() => setShowUpdateCustom(!showUpdateCustom)}
            >
              <span>{backChevron}</span>
              <span>Back</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
