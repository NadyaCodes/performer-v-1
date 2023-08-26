import React, { useState, useEffect, useRef } from "react";
import type { CustomProgram } from "@prisma/client";
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
import { KeyValueListType } from "./MyProgramsComponent";

type MyProgramsWithSessionProps = {
  userId: string;
  displayData: ProgramWithInfo[] | null;
  findUserFavs: (userId: string) => Promise<(ProgramWithType | undefined)[]>;
  setUserFavs: React.Dispatch<
    React.SetStateAction<[] | (ProgramWithType | undefined)[] | null>
  >;
  // favProgramRefs: Record<string, React.RefObject<HTMLDivElement>>;
  // customProgramRefs: Record<string, React.RefObject<HTMLDivElement>>;
  displayCustom: CustomProgram[];
  setDisplayCustom: React.Dispatch<React.SetStateAction<CustomProgram[]>>;
  // keyValueList: KeyValueListType[];
  loading: boolean;
  findCustomPrograms: () => Promise<CustomProgram[] | undefined>;
  // favHeaderRef: React.MutableRefObject<HTMLDivElement | null>;
  // customHeaderRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function MyProgramsWithSession({
  userId,
  displayData,
  findUserFavs,
  setUserFavs,
  // favProgramRefs,
  // customProgramRefs,
  displayCustom,
  setDisplayCustom,
  // keyValueList,
  loading,
  findCustomPrograms,
}: // favHeaderRef,
// customHeaderRef,
MyProgramsWithSessionProps) {
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

  useEffect(() => {
    setLoadingDelete(false);
  }, [displayData, displayCustom]);

  ///CREATING REFS - PROBABLY MOVE LOGIC TO MY PROGRAMS WITH SESSION
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
