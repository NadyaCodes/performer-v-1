import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import { PTProgram, FTProgram, CustomProgram } from "@prisma/client";
import { ProgramWithInfo } from "../ProgramFinder/types";
import SingleProgram from "./SingleProgram";
import LoadingLines from "../Loading/LoadingLines";
import { backArrow, plusIcon } from "@component/data/svgs";
import SingleCustom from "./SingleCustom";
import CustomProgramForm from "./CustomProgramForm";
import H2Title from "./H2Title";
import QuickLinks from "./QuickLinks";
import { ObjectList } from "@component/data/types";

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
      console.log("in first line");
      if (userFavs) {
        console.log("in second line");
        if (userFavs.length > 0) {
          console.log("in third line");
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

    if (displayCustom.length > 0) {
      newKeyValueList.push({
        customHeader: "-- Custom Programs --",
        type: "custom",
      });

      displayCustom.forEach((program) => {
        let text = program.school || program.name || "Unknown Program";

        if (program.city) text = `Unknown Program: ${program.city}`;
        else if (program.province)
          text = `Unknown Program: ${program.province}`;
        else if (program.country) text = `Unknown Program: ${program.country}`;
        else if (program.website) text = `Unknown Program: ${program.website}`;
        else if (program.typeFt) text = "Unknown Program: Full Time";
        else if (program.typePt) text = "Unknown Program: Part Time";
        else if (program.disciplineAct) text = "Unknown Program: Acting";
        else if (program.disciplineSing) text = "Unknown Program: Singing";
        else if (program.disciplineDance) text = "Unknown Program: Dance";
        else if (program.disciplineMT)
          text = "Unknown Program: Musical Theatre";

        newKeyValueList.push({ [program.id]: text, type: "custom" });
      });
    }

    setKeyValueList(newKeyValueList);
  }, [displayData, displayCustom]);

  const [translateX, setTranslateX] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("divide-line");
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        const halfHeight = windowHeight / 2;

        if (rect.top >= 0 && rect.bottom <= windowHeight) {
          if (rect.top > halfHeight) {
            setTranslateX(((rect.top - halfHeight) / 30) * -1);
          } else {
            setTranslateX(((rect.top - halfHeight) / 30) * -1);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  return (
    <div className="static flex min-h-screen flex-col items-center">
      <div
        className="absolute left-0 right-0 h-10 bg-cyan-950"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
        }}
      ></div>
      <div className="h-20"></div>

      <H2Title text="Saved Programs" icon="star" id="favsHeader" />
      {keyValueList.length > 4 && <QuickLinks keyValueList={keyValueList} />}

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
        <div className="-mt-16 flex w-full flex-col items-center justify-center">
          {programDisplay && programDisplay.length > 0 ? (
            <div className="w-7/12">{programDisplay}</div>
          ) : (
            <div>
              Explore Course Finder or Course Selector to add some Favorite
              Programs
            </div>
          )}
          <div
            className="flex w-full justify-center opacity-0"
            style={{ animation: "flyInFadeIn 1.5s linear 1s forwards" }}
          >
            <div
              className="my-12 h-2 w-5/6 rounded-full  bg-gradient-to-b from-cyan-700 to-indigo-800 shadow-md shadow-indigo-900"
              style={{
                transition: "width 0.3s",
                transform: `translateX(${translateX}%)`,
              }}
              id="divide-line"
            ></div>
          </div>
          <H2Title
            text="Custom Programs"
            icon="sparkle"
            style={delayStyle}
            id="customHeader"
            color="indigo"
          />
          <button
            onClick={() => {
              setShowUpdateCustom(!showUpdateCustom);
              window.scrollTo({
                top: 290,
                behavior: "smooth",
              });
            }}
            className="-mt-3 flex w-56 place-items-center justify-between rounded  px-4  py-2 font-semibold text-indigo-800  opacity-0 hover:scale-110  hover:bg-indigo-900 hover:text-indigo-50"
            style={{ animation: "pullDownTop 0.3s linear 4s forwards" }}
          >
            <span>Add Custom Program </span>
            <span>{plusIcon}</span>
          </button>
          {customProgramDisplay.length > 0 ? (
            <div className="w-7/12">{customProgramDisplay}</div>
          ) : (
            <div>You have no custom programs</div>
          )}
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
