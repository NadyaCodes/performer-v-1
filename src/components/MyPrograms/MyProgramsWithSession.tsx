import React, { useState, useEffect, useRef, useCallback } from "react";
import { api } from "@component/utils/api";
import type { CustomProgram, SchoolLocation } from "@prisma/client";
import type { ProgramWithInfo } from "../ProgramFinder/types";
import SingleProgram from "./SingleProgram";
import { backChevron, plusIcon } from "@component/data/svgs";
import SingleCustom from "./SingleCustom";
import CustomProgramForm from "./CustomProgramForm";
import QuickLinks from "./QuickLinks";
import MobileQuickLinks from "./MobileQuickLinks";
import ProgramDisplay from "./ProgramDisplay";
import MyProgramsLoading from "./MyProgramsLoading";
import type { ProgramWithType } from "./MyProgramsComponent";
import type { KeyValueListType } from "./MyProgramsComponent";
import type { PTProgram, FTProgram } from "@prisma/client";
import PatreonLinkOrLogout from "../PatreonButtons/PatreonLinkOrLogout";
import type { Note } from "@prisma/client";
import { usePatreon } from "@component/contexts/PatreonContext";

export type FavsWithSLOType = {
  schoolLocation: SchoolLocation;
  element: ProgramWithType;
};

export default function MyProgramsWithSession({ userId }: { userId: string }) {
  const [showUpdateCustom, setShowUpdateCustom] = useState<
    boolean | CustomProgram
  >(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean | string>(false);
  const [favProgramRefs, setFavProgramRefs] = useState<
    Record<string, React.RefObject<HTMLDivElement>>
  >({});
  const [customProgramRefs, setCustomProgramRefs] = useState<
    Record<string, React.RefObject<HTMLDivElement>>
  >({});
  const [userFavs, setUserFavs] = useState<
    (ProgramWithType | ProgramWithType | undefined)[] | [] | null
  >(null);

  const [displayData, setDisplayData] = useState<ProgramWithInfo[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [displayCustom, setDisplayCustom] = useState<
    CustomProgram[] | undefined | null
  >(null);
  const [animatePrograms, setAnimatePrograms] = useState(true);

  const utils = api.useContext();

  const { patreonInfo } = usePatreon();

  useEffect(() => {
    setLoadingDelete(false);
  }, [displayData, displayCustom]);

  /////////////////FINDING FAVES

  const findProgramObject = useCallback(
    async (id: string) => {
      const ptProgramObject = await utils.ptProgram.getOneById.fetch({ id });
      const ftProgramObject = await utils.ftProgram.getOneById.fetch({ id });
      if (ftProgramObject) {
        return ftProgramObject;
      }
      if (ptProgramObject) {
        return ptProgramObject;
      }
    },
    [utils.ptProgram.getOneById, utils.ftProgram.getOneById]
  );

  const findUserFavs = useCallback(
    async (userId: string) => {
      const allUserFavs = utils.favs.getAllForUser.fetch({ userId });
      const userFavPrograms: (ProgramWithType | undefined)[] =
        await Promise.all(
          (
            await allUserFavs
          ).map(async (element) => {
            if (element.ftProgramId) {
              const program = (await findProgramObject(
                element.ftProgramId
              )) as FTProgram;
              return (
                { ...program, type: "ft", favProgramId: element.id } ||
                undefined
              );
            }
            if (element.ptProgramId) {
              const program = (await findProgramObject(
                element.ptProgramId
              )) as PTProgram;
              return (
                { ...program, type: "pt", favProgramId: element.id } ||
                undefined
              );
            }
            return undefined;
          })
        );
      return userFavPrograms;
    },
    [findProgramObject, utils.favs.getAllForUser]
  );

  const useFindUserFavs = () => {
    const findUserFavs = useCallback(async (userId: string) => {
      const allUserFavs = utils.favs.getAllForUser.fetch({ userId });
      const userFavPrograms: (ProgramWithType | undefined)[] =
        await Promise.all(
          (
            await allUserFavs
          ).map(async (element) => {
            if (element.ftProgramId) {
              const program = (await findProgramObject(
                element.ftProgramId
              )) as FTProgram;
              return (
                { ...program, type: "ft", favProgramId: element.id } ||
                undefined
              );
            }
            if (element.ptProgramId) {
              const program = (await findProgramObject(
                element.ptProgramId
              )) as PTProgram;
              return (
                { ...program, type: "pt", favProgramId: element.id } ||
                undefined
              );
            }
            return undefined;
          })
        );
      return userFavPrograms;
    }, []);
    return findUserFavs;
  };

  const findUserFavsHook = useFindUserFavs();

  useEffect(() => {
    findUserFavsHook(userId)
      .then((result) => {
        result ? setUserFavs(result) : setUserFavs([]);
      })
      .catch((error) => console.error("Error finding user favs: ", error));
  }, [findUserFavsHook, userId]);

  //////////////////FINDING CUSTOM PROGRAMS
  const useFindCustomPrograms = () => {
    const findCustomPrograms = useCallback(async () => {
      const allCustomPrograms = await utils.customProgram.getAllForUser.fetch({
        userId,
      });
      return allCustomPrograms;
    }, []);
    return findCustomPrograms;
  };

  const findCustomPrograms = useFindCustomPrograms();

  //////////////////FETCHING ALL THE EXTRA DATA NEEDED FOR FAV PROGRAM DISPLAY
  const schoolLocationRef = useRef<string>("");
  const schoolRef = useRef<string>("");
  const locationRef = useRef<string>("");

  const useSchoolLocation = () => {
    return useCallback(async () => {
      const schoolLocationObject = await utils.schoolLocation.getOneById.fetch({
        id: schoolLocationRef.current,
      });
      return schoolLocationObject;
    }, []);
  };

  const useSchool = () => {
    return useCallback(async () => {
      const schoolObject = await utils.school.getOneById.fetch({
        id: schoolRef.current,
      });
      return schoolObject;
    }, []);
  };

  const useLocation = () => {
    return useCallback(async () => {
      const locationObject = await utils.location.getOneById.fetch({
        id: locationRef.current,
      });
      return locationObject;
    }, []);
  };

  const getSchoolLocation = useSchoolLocation();
  const getSchool = useSchool();
  const getLocation = useLocation();

  const useAddAllDataToUserFav = () => {
    const addAllDataToUserFav = useCallback(
      async (userFavs: [] | (ProgramWithType | undefined)[]) => {
        const fullDataObject = await Promise.all(
          userFavs.map(async (element) => {
            if (element) {
              const schoolLocationId = element.schoolLocationId;
              schoolLocationRef.current = schoolLocationId;
              const schoolLocationObject = await getSchoolLocation();
              if (schoolLocationObject) {
                schoolRef.current = schoolLocationObject.schoolId;
                locationRef.current = schoolLocationObject.locationId;
                const schoolObject = await getSchool();
                const locationObject = await getLocation();

                return {
                  id: element.id,
                  schoolLocationId: schoolLocationId,
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

        return fullDataObject
          .filter((item) => item !== undefined)
          .sort((a, b) =>
            (a?.schoolObj?.name || "").localeCompare(b?.schoolObj?.name || "")
          ) as ProgramWithType[];
      },
      []
    );

    return addAllDataToUserFav;
  };

  const addAllDataToUserFavHook = useAddAllDataToUserFav();

  const useFetchData = (
    addDataToUserFavs: (
      userFavs: [] | (ProgramWithType | undefined)[]
    ) => Promise<ProgramWithType[]>,
    findCustomPrograms: () => Promise<CustomProgram[] | undefined>,
    userFavs: [] | (ProgramWithType | undefined)[] | null,
    setDisplayCustom: React.Dispatch<
      React.SetStateAction<CustomProgram[] | undefined | null>
    >,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const fetchData = useCallback(async () => {
      try {
        if (userFavs === null) {
          setDisplayData(null);
        } else if (userFavs === undefined || userFavs.length === 0) {
          setDisplayData([]);
        } else {
          console.log("starting to process data");
          const allFavData: ProgramWithType[] = await addDataToUserFavs(
            userFavs
          );
          setDisplayData(allFavData);
        }

        const customPrograms = await findCustomPrograms();
        setDisplayCustom(customPrograms);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    }, [
      userFavs,
      findCustomPrograms,
      setDisplayCustom,
      setLoading,
      addDataToUserFavs,
    ]);
    return fetchData;
  };

  const memoizedSetDisplayCustom = useCallback<
    React.Dispatch<React.SetStateAction<CustomProgram[] | undefined | null>>
  >(
    (
      newValue:
        | CustomProgram[]
        | undefined
        | null
        | ((
            prevState: CustomProgram[] | undefined | null
          ) => CustomProgram[] | undefined | null)
    ) => {
      setDisplayCustom(newValue);
    },
    []
  );

  const memoizedSetLoading = useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >((newValue: boolean | ((prevValue: boolean) => boolean)) => {
    setLoading(newValue);
  }, []);

  const fetchDataHook = useFetchData(
    addAllDataToUserFavHook,
    findCustomPrograms,
    userFavs,
    memoizedSetDisplayCustom,
    memoizedSetLoading
  );

  useEffect(() => {
    fetchDataHook().catch((error) =>
      console.error("Error fetching data: ", error)
    );
  }, [userFavs, fetchDataHook]);

  useEffect(() => {
    if (displayData !== null && displayCustom !== null) {
      setLoading(false);
      setTimeout(() => {
        setAnimatePrograms(false);
      }, 3000);
    }
  }, [displayCustom, displayData]);

  ///CREATING REFS FOR QUICKLINKS MENU
  useEffect(() => {
    if (displayData) {
      const newProgramRefs: Record<
        string,
        React.RefObject<HTMLDivElement>
      > = {};
      displayData.forEach((program) => {
        newProgramRefs[program.id] = React.createRef<HTMLDivElement>();
      });
      setFavProgramRefs(newProgramRefs);
    }

    if (displayCustom && displayCustom.length > 0) {
      const newCustomProgramRefs: Record<
        string,
        React.RefObject<HTMLDivElement>
      > = {};
      displayCustom.forEach((program) => {
        newCustomProgramRefs[program.id] = React.createRef<HTMLDivElement>();
      });
      setCustomProgramRefs(newCustomProgramRefs);
    }
  }, [displayData, displayCustom]);

  const [keyValueList, setKeyValueList] = useState<KeyValueListType[]>([]);
  const favHeaderRef = useRef<HTMLDivElement | null>(null);
  const customHeaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newKeyValueList: KeyValueListType[] = [];
    const newProgramRefs: Record<string, React.RefObject<HTMLDivElement>> = {};

    if (displayData) {
      displayData.forEach((program) => {
        newProgramRefs[program.id] = React.createRef<HTMLDivElement>();
      });
      setFavProgramRefs(newProgramRefs);
    }

    newKeyValueList.push({
      text: "-- Saved Programs --",
      type: "fav",
      id: "favHeader",
      componentRef: favHeaderRef,
    });

    displayData?.forEach((program) => {
      const text =
        program.schoolObj?.name ||
        program.name ||
        program.website ||
        "Unknown Program";
      const ref = newProgramRefs[program.id];
      newKeyValueList.push({
        text,
        type: "fav",
        id: program.id,
        componentRef: ref,
      });
    });

    if (patreonInfo && patreonInfo.id) {
      const newCustomProgramRefs: Record<
        string,
        React.RefObject<HTMLDivElement>
      > = {};

      if (displayCustom && displayCustom.length > 0) {
        displayCustom.forEach((program) => {
          newCustomProgramRefs[program.id] = React.createRef<HTMLDivElement>();
        });
        setCustomProgramRefs(newCustomProgramRefs);
      }

      newKeyValueList.push({
        text: "-- Custom Programs --",
        type: "custom",
        id: "customHeader",
        componentRef: customHeaderRef,
      });

      if (displayCustom && displayCustom.length > 0) {
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
          const ref = newCustomProgramRefs[program.id];

          newKeyValueList.push({
            text,
            type: "custom",
            id: program.id,
            componentRef: ref,
          });
        });
      }
    }

    setKeyValueList(newKeyValueList);
  }, [displayData, displayCustom, patreonInfo]);

  const [notes, setNotes] = useState<{ [key: string]: Note[] } | null | []>(
    null
  );

  const programDisplay = displayData?.map((element: ProgramWithInfo) => {
    return (
      <SingleProgram
        program={element}
        key={element.id}
        loadingDelete={loadingDelete}
        setLoadingDelete={setLoadingDelete}
        findUserFavs={findUserFavs}
        setUserFavs={setUserFavs}
        ref={favProgramRefs[element.id]}
        notes={notes}
        setNotes={setNotes}
        animate={animatePrograms}
      />
    );
  });

  const customProgramDisplay = displayCustom?.map((element) => {
    return (
      <SingleCustom
        program={element}
        key={element.id}
        setDisplayCustom={setDisplayCustom}
        setShowUpdateCustom={setShowUpdateCustom}
        loadingDelete={loadingDelete}
        setLoadingDelete={setLoadingDelete}
        ref={customProgramRefs[element.id]}
        notes={notes}
        setNotes={setNotes}
        animate={animatePrograms}
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
    <div className="">
      {loading && <MyProgramsLoading />}

      {keyValueList.length > 3 && !showUpdateCustom && !loading && (
        <>
          <QuickLinks keyValueList={keyValueList} />
        </>
      )}
      {!loading && (
        <MobileQuickLinks
          keyValueList={keyValueList}
          hideMenu={keyValueList.length <= 3 || !!showUpdateCustom}
        />
      )}

      <div className="static flex min-h-screen -translate-y-3 flex-col items-center overflow-x-hidden">
        {!loading && (
          <div
            className="absolute left-0 right-0 hidden h-10 bg-cyan-950 mobileMenu:block"
            style={{
              boxShadow:
                "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
            }}
          ></div>
        )}
        {loadingDelete && (
          <div
            className="fixed inset-0 z-10 transition-all"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
            }}
          ></div>
        )}
        <div className="h-60 mobileMenu:h-5"></div>

        {showUpdateCustom && (
          <div className="flex w-11/12 pb-4 md:w-9/12 mobileMenu:w-2/3">
            <button
              className="flex font-semibold text-indigo-900 hover:scale-110 hover:text-indigo-800"
              onClick={() => setShowUpdateCustom(!showUpdateCustom)}
            >
              <span>{backChevron}</span>
              <span>Back</span>
            </button>
          </div>
        )}

        <div
          className="hidden w-full flex-col items-center mobileMenu:flex"
          style={{
            animation:
              keyValueList.length > 3 && !showUpdateCustom
                ? "translateRight .7s linear 1.7s forwards"
                : "",
          }}
        >
          {!showUpdateCustom && !loading && (
            <div className="flex w-7/12 justify-end">
              <div
                className="opacity-0"
                style={{
                  animation: animatePrograms
                    ? "pullDownTop 0.5s linear 1s forwards"
                    : "pullDownTop 0s linear forwards",
                }}
              >
                <div
                  style={{
                    animation: animatePrograms
                      ? "wiggle .3s linear 2s  3 forwards"
                      : "",
                  }}
                >
                  <PatreonLinkOrLogout />
                </div>
              </div>
            </div>
          )}
          {!showUpdateCustom && !loading && (
            <ProgramDisplay
              programDisplay={programDisplay}
              addCustomButton={addCustomButton}
              customProgramDisplay={customProgramDisplay || []}
              favHeaderRef={favHeaderRef}
              customHeaderRef={customHeaderRef}
              flyIn={animatePrograms}
            />
          )}
        </div>

        <div className="flex w-full flex-col items-center mobileMenu:hidden">
          {!showUpdateCustom && !loading && (
            <div
              className="m-2 place-self-end opacity-0"
              style={{
                animation: animatePrograms
                  ? "pullDownTop 0.5s linear 1s forwards"
                  : "pullDownTop 0s linear forwards",
              }}
            >
              <PatreonLinkOrLogout />
            </div>
          )}
          {!showUpdateCustom && !loading && (
            <ProgramDisplay
              programDisplay={programDisplay}
              addCustomButton={addCustomButton}
              customProgramDisplay={customProgramDisplay || []}
              favHeaderRef={favHeaderRef}
              customHeaderRef={customHeaderRef}
              flyIn={animatePrograms}
            />
          )}
        </div>

        {showUpdateCustom && !loading && (
          <div className="flex w-full justify-center">
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
          <div className="flex w-11/12 justify-end py-4 md:w-9/12 mobileMenu:w-2/3">
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
