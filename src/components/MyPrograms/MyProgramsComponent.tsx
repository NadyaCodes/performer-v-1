import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import type { PTProgram, FTProgram, CustomProgram } from "@prisma/client";
import type { ProgramWithInfo } from "../ProgramFinder/types";
import SingleProgram from "./SingleProgram";
import LoadingLines from "../Loading/LoadingLines";
import { backChevron, plusIcon } from "@component/data/svgs";
import SingleCustom from "./SingleCustom";
import CustomProgramForm from "./CustomProgramForm";
import QuickLinks from "./QuickLinks";
import MobileQuickLinks from "./MobileQuickLinks";
import LoadingPrograms from "./LoadingPrograms";
import ProgramDisplay from "./ProgramDisplay";
import AuthShowcase from "../Menu/AuthShowcase";
import H2Title from "./H2Title";

export type ProgramWithType = {
  id: string;
  schoolLocationId: string;
  website: string;
  discipline: string;
  name?: string;
  type: string;
  favProgramId?: string;
};

export type KeyValueListType = {
  type: string;
  componentRef?: React.RefObject<HTMLDivElement> | undefined;
  id: string | null;
  text: string;
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
  const [favProgramRefs, setFavProgramRefs] = useState<
    Record<string, React.RefObject<HTMLDivElement>>
  >({});
  const [customProgramRefs, setCustomProgramRefs] = useState<
    Record<string, React.RefObject<HTMLDivElement>>
  >({});

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

  const useFindUserFavs = () => {
    const findUserFavsCB = useCallback(async (userId: string) => {
      try {
        const allUserFavs = await utils.favs.getAllForUser.fetch({ userId });
        const userFavPrograms: (ProgramWithType | undefined)[] =
          await Promise.all(
            allUserFavs.map(async (element) => {
              if (element.ftProgramId) {
                const program = (await findProgramObject(
                  element.ftProgramId
                )) as FTProgram;
                return (
                  {
                    ...program,
                    type: "ft",
                    favProgramId: element.id,
                  } || undefined
                );
              }
              if (element.ptProgramId) {
                const program = (await findProgramObject(
                  element.ptProgramId
                )) as PTProgram;
                return (
                  {
                    ...program,
                    type: "pt",
                    favProgramId: element.id,
                  } || undefined
                );
              }
              return undefined;
            })
          );
        return userFavPrograms;
      } catch (error) {
        console.error("Error fetching Prisma program:", error);
        return null;
      }
    }, []);
    return findUserFavsCB;
  };

  const customHookFindUserFavs = useFindUserFavs();

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

  const memoizedFindUserFavs = useMemo(() => {
    if (sessionData) {
      return async () => {
        try {
          const result = await customHookFindUserFavs(sessionData.user.id);
          setUserFavs(result ? result : []);
        } catch (error) {
          console.error("Error finding user Favs: ", error);
        }
      };
    }
    return null;
  }, [sessionData, customHookFindUserFavs]);

  useEffect(() => {
    if (memoizedFindUserFavs) {
      memoizedFindUserFavs().catch((error) =>
        console.error("Error finding user favs: ", error)
      );
    }
  }, [memoizedFindUserFavs]);

  const findCustomPrograms = async (userId: string) => {
    if (userId) {
      const allCustomPrograms = await utils.customProgram.getAllForUser.fetch({
        userId,
      });
      return allCustomPrograms;
    }
  };

  const useFindCustomProgramsCB = () => {
    const findCustomProgramsCB = useCallback(async (userId: string) => {
      if (userId) {
        const allCustomPrograms = await utils.customProgram.getAllForUser.fetch(
          {
            userId,
          }
        );
        return allCustomPrograms;
      }
    }, []);
    return findCustomProgramsCB;
  };

  const customHookFindCustomPrograms = useFindCustomProgramsCB();

  const fetchDisplayData = async (
    userFavs: (ProgramWithType | undefined)[] | null
  ) => {
    if (userFavs) {
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
      newData.filter((item) => item !== undefined) as ProgramWithInfo[];
      return newData;
    }
  };

  const fetchDisplayDataCB = useCallback(
    async (userFavPrograms: (ProgramWithType | undefined)[]) => {
      if (userFavPrograms) {
        const newData = await fetchDisplayData(userFavPrograms);
        if (newData) {
          const filteredResult = newData.filter(
            (item) => item !== undefined
          ) as ProgramWithInfo[];
          setDisplayData([...filteredResult]);
          return newData;
        }
      }
    },
    [fetchDisplayData, setDisplayData]
  );

  const useFetchDisplayData = () => {
    const wrappedFetchDisplayDataCB = useCallback(
      async (userFavs: (ProgramWithType | undefined)[] | null) => {
        if (userFavs) {
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
          newData.filter((item) => item !== undefined) as ProgramWithInfo[];
          return newData;
        }
      },
      []
    );
    return wrappedFetchDisplayDataCB;
  };

  const customHookFetchDisplayData = useFetchDisplayData();

  useEffect(() => {
    const fetchData = async () => {
      if (sessionData && userId) {
        try {
          setLoading(true);
          const userFavPrograms = await findUserFavs(sessionData.user.id);
          setUserFavs(userFavPrograms);

          const newData = await customHookFetchDisplayData(userFavPrograms);
          if (newData) {
            const filteredResult = newData.filter(
              (item) => item !== undefined
            ) as ProgramWithInfo[];
            setDisplayData([...filteredResult]);
          }

          const customPrograms = await customHookFindCustomPrograms(
            sessionData.user.id
          );
          if (customPrograms) {
            setDisplayCustom([...customPrograms]);
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setLoading(false);
        }
      }
    };
    fetchData().catch((error) => console.error("Error fetching data: ", error));
  }, [sessionData, customHookFindCustomPrograms, customHookFetchDisplayData]);

  const updateData = async () => {
    if (sessionData && userFavs) {
      try {
        await fetchDisplayDataCB(userFavs);
        await customHookFindCustomPrograms(sessionData.user.id);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  useEffect(() => {
    updateData().catch((error) =>
      console.error("Error updating data: ", error)
    );
  }, [userFavs, sessionData]);

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

    if (displayCustom.length > 0) {
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

  useEffect(() => {
    if (displayData !== null || displayCustom.length > 0) {
      setLoading(false);
    }
  }, [displayCustom, displayData]);

  useEffect(() => {
    setLoadingDelete(false);
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

    const newCustomProgramRefs: Record<
      string,
      React.RefObject<HTMLDivElement>
    > = {};

    if (displayCustom.length > 0) {
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
        const ref = newCustomProgramRefs[program.id];

        newKeyValueList.push({
          text,
          type: "custom",
          id: program.id,
          componentRef: ref,
        });
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
        ref={favProgramRefs[element.id]}
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
        ref={customProgramRefs[element.id]}
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

  return typeof userId !== "string" ? (
    <div className="flex flex-col items-center">
      <div
        className="absolute left-0 right-0 hidden h-10 bg-cyan-950 mobileMenu:block"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
        }}
      ></div>
      <div
        className="text-bold mt-10 flex w-full flex-col content-center items-center p-3 text-center text-lg mobileMenu:mt-20"
        style={{ animation: "fadeIn .7s linear" }}
      >
        <H2Title text="Saved Programs" icon="star" id="favsHeader" />
        <div
          className="m-2 opacity-0"
          style={{ animation: "pullDownTop .5s linear .2s forwards" }}
        >
          Store your favorite programs here!
        </div>
        <div
          className="m-2 opacity-0"
          style={{ animation: "pullDownTop .5s linear .8s forwards" }}
        >
          This page requires an account.
        </div>
        <div
          className="m-2 opacity-0"
          style={{ animation: "pullDownTop .5s linear 1.4s forwards" }}
        >
          Please sign in below.
        </div>
      </div>
      <div className="scale-150">
        <div style={{ animation: "wiggle .4s linear 2s 2" }}>
          <AuthShowcase />
        </div>
      </div>
    </div>
  ) : (
    <div className="">
      {loading && (
        <div className="flex justify-center">
          <div
            className="absolute left-0 right-0 hidden h-10 bg-cyan-950 mobileMenu:block"
            style={{
              boxShadow:
                "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
            }}
          ></div>
          <div className="w-fullxs:w-11/12 flex translate-y-2 justify-center mobileMenu:w-7/12">
            <div
              className="mt-10 flex w-full justify-between place-self-center text-lg font-semibold text-cyan-800 opacity-0 xs:w-11/12 xs:text-xl sm:text-3xl md:mt-20 mobileMenu:w-7/12"
              style={{ animation: "fadeIn .8s forwards" }}
            >
              <LoadingPrograms />
            </div>
            <div className="pt-60">
              <LoadingLines />
            </div>
          </div>
        </div>
      )}

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
        <div className="h-60 mobileMenu:h-20"></div>

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
            <ProgramDisplay
              programDisplay={programDisplay}
              addCustomButton={addCustomButton}
              customProgramDisplay={customProgramDisplay}
              favHeaderRef={favHeaderRef}
              customHeaderRef={customHeaderRef}
            />
          )}
        </div>

        <div className="flex w-full flex-col items-center mobileMenu:hidden">
          {!showUpdateCustom && !loading && (
            <ProgramDisplay
              programDisplay={programDisplay}
              addCustomButton={addCustomButton}
              customProgramDisplay={customProgramDisplay}
              favHeaderRef={favHeaderRef}
              customHeaderRef={customHeaderRef}
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
