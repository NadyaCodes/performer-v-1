import { createContext, useEffect, useState, useCallback } from "react";
import type { NextPage } from "next";
import { api } from "@component/utils/api";
import ProgramItem from "./ProgramItem";
import FilterMenu from "./FilterMenu";
import { searchForValueSimple } from "./helpers";
import type {
  FilterContextValue,
  FilterContextState,
  ProgramWithInfo,
} from "./types";
import { useSession } from "next-auth/react";
import LoadingLines from "../Loading/LoadingLines";
import TermsDisplay from "./TermsDisplay";
import ScrollArrow from "./ScrollArrow";
import NoPrograms from "./NoPrograms";
import type { FavProgram } from "@prisma/client";
import { convertUserFavs } from "./helpers";
import MiniScrollArrow from "./MiniScrollArrow";

export const FilterContext = createContext<FilterContextState | null>(null);

const ProgramFinderComponent: NextPage = () => {
  const { data: ftProgramData } = api.ftProgram.getAll.useQuery();
  const { data: ptProgramData } = api.ptProgram.getAll.useQuery();
  const { data: schoolLocationData } = api.schoolLocation.getAll.useQuery();
  const { data: schools } = api.school.getAll.useQuery();
  const { data: locations } = api.location.getAll.useQuery();
  const { data: sessionData } = useSession();
  const utils = api.useContext();

  const [allPrograms, setAllPrograms] = useState<ProgramWithInfo[]>([]);

  const defaultFilterContext: FilterContextValue = {
    type: "",
    discipline: "",
    location: { province: "", city: "", area: "" },
  };
  const [selectedOptions, setSelectedOptions] =
    useState<FilterContextValue>(defaultFilterContext);

  const [programDisplay, setProgramDisplay] = useState<JSX.Element[] | null>(
    null
  );
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramWithInfo[]>(
    []
  );
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingPageData, setLoadingPageData] = useState(true);
  const [starPopUp, setStarPopUp] = useState<string>("");

  const userId = sessionData?.user.id || null;

  //Capture all program data, and add type to object
  useEffect(() => {
    let ftLabelled;
    if (ftProgramData) {
      ftLabelled = ftProgramData?.map((program) => {
        const schoolLocObj = schoolLocationData?.find(
          (schoolLoc) => schoolLoc.id === program.schoolLocationId
        );
        const cityObj = locations?.find(
          (loc) => loc.id === schoolLocObj?.locationId
        );
        const schoolObj = schools?.find(
          (school) => school.id === schoolLocObj?.schoolId
        );
        return { ...program, type: "ft", cityObj, schoolObj };
      });
    }
    let ptLabelled;
    if (ptProgramData) {
      ptLabelled = ptProgramData?.map((program) => {
        const schoolLocObj = schoolLocationData?.find(
          (schoolLoc) => schoolLoc.id === program.schoolLocationId
        );
        const cityObj = locations?.find(
          (loc) => loc.id === schoolLocObj?.locationId
        );
        const schoolObj = schools?.find(
          (school) => school.id === schoolLocObj?.schoolId
        );
        return { ...program, type: "pt", cityObj, schoolObj };
      });
    }

    let tempArray: ProgramWithInfo[] = [];
    ftLabelled && (tempArray = tempArray.concat(ftLabelled));
    ptLabelled && (tempArray = tempArray.concat(ptLabelled));
    tempArray.sort((a, b) => {
      const nameA = a.schoolObj?.name || "";
      const nameB = b.schoolObj?.name || "";

      return nameA.localeCompare(nameB);
    });
    setAllPrograms(tempArray);
  }, [ftProgramData, ptProgramData, locations, schoolLocationData, schools]);

  //FAVE PROGRAMS

  const [userFavsObject, setUserFavsObject] = useState<FavProgram[] | null>(
    null
  );
  const [favProgramIdsArray, setFavProgramIdsArray] = useState<string[] | null>(
    null
  );

  const useFetchFavsObj = () => {
    const fetchFavsObj = useCallback(async (userId: string) => {
      const userObj = await utils.favs.getAllForUser.fetch({ userId });
      if (userObj) {
        return userObj;
      }
    }, []);
    return fetchFavsObj;
  };

  const fetchFavsObjHook = useFetchFavsObj();

  const memoizedSetLoadingFavs = useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >((newValue: boolean | ((prevState: boolean) => boolean)) => {
    setLoadingFavs(newValue);
  }, []);

  useEffect(() => {
    if (!sessionData) {
      memoizedSetLoadingFavs(false);
    }
  }, [sessionData, memoizedSetLoadingFavs]);

  const memoizedSetUserFavsObject = useCallback<
    React.Dispatch<React.SetStateAction<FavProgram[] | null>>
  >(
    (
      newValue:
        | FavProgram[]
        | null
        | ((prevState: FavProgram[] | null) => FavProgram[] | null)
    ) => {
      setUserFavsObject(newValue);
    },
    []
  );

  useEffect(() => {
    if (userId) {
      fetchFavsObjHook(userId)
        .then((result) => result && memoizedSetUserFavsObject(result))
        .catch((error) => console.error("Error fetching favsObj: ", error));
    } else {
      memoizedSetLoadingFavs(false);
    }
  }, [
    userId,
    fetchFavsObjHook,
    memoizedSetUserFavsObject,
    memoizedSetLoadingFavs,
  ]);

  useEffect(() => {
    if (userFavsObject) {
      const newArray = convertUserFavs(userFavsObject);
      newArray.filter((element) => element !== undefined);
      setFavProgramIdsArray([...newArray] as string[]);
      memoizedSetLoadingFavs(false);
    } else {
      memoizedSetLoadingFavs(false);
    }
  }, [userFavsObject, memoizedSetLoadingFavs]);

  const memoizedSetFilteredPrograms = useCallback<
    React.Dispatch<React.SetStateAction<ProgramWithInfo[]>>
  >(
    (
      newValue:
        | ProgramWithInfo[]
        | ((prevState: ProgramWithInfo[]) => ProgramWithInfo[])
    ) => {
      setFilteredPrograms(newValue);
    },
    []
  );

  //filter and display correct data
  useEffect(() => {
    if (allPrograms) {
      const newFilteredPrograms = searchForValueSimple(
        activeSearchTerm,
        allPrograms,
        selectedOptions
      );

      memoizedSetFilteredPrograms(newFilteredPrograms);

      setTimeout(() => {
        setLoadingPageData(false);
      }, 2000);
    }
  }, [
    selectedOptions,
    allPrograms,
    activeSearchTerm,
    memoizedSetFilteredPrograms,
  ]);

  const memoizedSetProgramDisplay = useCallback<
    React.Dispatch<React.SetStateAction<JSX.Element[] | null>>
  >(
    (
      newValue:
        | JSX.Element[]
        | null
        | ((prevState: JSX.Element[] | null) => JSX.Element[] | null)
    ) => {
      setProgramDisplay(newValue);
    },
    []
  );

  const memoizedSetStarPopUp = useCallback<
    React.Dispatch<React.SetStateAction<string>>
  >((newValue: string | ((prevState: string) => string)) => {
    setStarPopUp(newValue);
  }, []);

  useEffect(() => {
    const tempProgramDisplay: JSX.Element[] = filteredPrograms.map(
      (element) => {
        return (
          <ProgramItem
            key={element.id}
            element={element}
            fetchUserFavsObject={fetchFavsObjHook}
            setFavesObject={setUserFavsObject}
            favProgramIdsArray={favProgramIdsArray}
            loadingFavs={loadingFavs}
            setStarPopUp={memoizedSetStarPopUp}
            starPopUp={starPopUp}
          />
        );
      }
    );

    memoizedSetProgramDisplay(tempProgramDisplay);
  }, [
    filteredPrograms,
    userFavsObject,
    favProgramIdsArray,
    loadingFavs,
    memoizedSetProgramDisplay,
    fetchFavsObjHook,
    starPopUp,
    memoizedSetStarPopUp,
  ]);

  return (
    <div className="min-h-screen min-w-full bg-cyan-50 bg-opacity-80">
      <FilterContext.Provider
        value={{
          selectedOptions,
          setSelectedOptions,
          filteredPrograms,
          setFilteredPrograms,
          allPrograms,
          setProgramDisplay,
          activeSearchTerm,
          setActiveSearchTerm,
          searchTerm,
          setSearchTerm,
        }}
      >
        <div className="relative z-30 min-w-full">
          <FilterMenu />
        </div>

        {loadingPageData && (
          <div className="m-1 h-screen bg-cyan-50 pt-20 transition-all">
            <LoadingLines />
          </div>
        )}
        <div
          className="mt-5 flex grid-cols-[1fr,2fr] flex-col gap-5 opacity-0 lg:ml-5 lg:grid xl:ml-16 xl:mt-16"
          style={{ animation: "fadeIn 1s linear 2s forwards" }}
        >
          {!loadingPageData && (
            <>
              <div className="hidden w-96 flex-col lg:flex 2xl:w-128">
                <TermsDisplay
                  num={(programDisplay && programDisplay.length) || 0}
                  defaultFilterContext={defaultFilterContext}
                  idTag="_1"
                />
                <ScrollArrow />
              </div>
              <div className="flex w-11/12 flex-col place-self-center md:w-7/12 lg:hidden">
                <TermsDisplay
                  num={(programDisplay && programDisplay.length) || 0}
                  defaultFilterContext={defaultFilterContext}
                  idTag="_2"
                />
              </div>
            </>
          )}

          <div className="sticky top-6 h-0 lg:hidden">
            <div className="relative">
              <MiniScrollArrow />
            </div>
          </div>
          {!loadingPageData && programDisplay && programDisplay.length >= 1 && (
            <div className="flex w-11/12 justify-center place-self-center overflow-x-hidden lg:pr-20 xl:pr-28 ">
              <div className="-mt-10 w-full place-self-center lg:mt-0">
                {programDisplay}
              </div>
            </div>
          )}

          {!loadingPageData && programDisplay && programDisplay.length < 1 && (
            <NoPrograms />
          )}
        </div>
      </FilterContext.Provider>
    </div>
  );
};

export default ProgramFinderComponent;
