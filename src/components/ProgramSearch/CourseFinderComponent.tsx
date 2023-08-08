import { createContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { api } from "@component/utils/api";
import ProgramItem from "./ProgramItem";
import FilterMenu from "./FilterMenu";
import { searchForValue } from "./helpers";
import {
  FilterContextValue,
  FilterContextState,
  ProgramWithInfo,
} from "./types";
import { useSession } from "next-auth/react";
import LoadingLines from "../Loading/LoadingLines";
import TermsDisplay from "./TermsDisplay";

export const FilterContext = createContext<FilterContextState | null>(null);

const CourseFinderComponent: NextPage = () => {
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
  const [userFavs, setUserFavs] = useState<string[] | null>(null);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingPageData, setLoadingPageData] = useState(true);

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
  }, [ftProgramData, ptProgramData]);

  //filter and display correct data
  useEffect(() => {
    if (allPrograms) {
      const filterContextObject = {
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
      };
      const newFilteredPrograms = searchForValue(
        activeSearchTerm,
        filterContextObject
      );

      setFilteredPrograms(newFilteredPrograms);

      setTimeout(() => {
        setLoadingPageData(false);
      }, 1500);
    }
  }, [selectedOptions, allPrograms]);

  useEffect(() => {
    const tempProgramDisplay: JSX.Element[] = filteredPrograms.map(
      (element) => {
        return (
          <ProgramItem
            key={element.id}
            element={element}
            fav={userFavs?.includes(element.id) || false}
            findUserFavs={findUserFavs}
            setUserFavs={setUserFavs}
            loadingFavs={loadingFavs}
          />
        );
      }
    );

    setProgramDisplay(tempProgramDisplay);
  }, [filteredPrograms, userFavs]);

  //FAVE PROGRAMS

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

  return (
    <div className="min-h-screen">
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
        <div className="relative z-30">
          <FilterMenu />
        </div>
        {loadingPageData && (
          <div className="m-10 transition-all">
            <LoadingLines />
          </div>
        )}
        <div
          className="m-5 flex opacity-0"
          style={{ animation: "fadeIn 1s linear 2s forwards" }}
        >
          {!loadingPageData && (
            <TermsDisplay
              num={(programDisplay && programDisplay.length) || 0}
              defaultFilterContext={defaultFilterContext}
            />
          )}

          {!loadingPageData && programDisplay && programDisplay.length >= 1 && (
            <div className="w-7/12">{programDisplay}</div>
          )}
          {!loadingPageData && programDisplay && programDisplay.length < 1 && (
            <div className=" flex w-7/12 justify-center pt-16 text-center">
              There are no programs that match your queries. Please broaden your
              search and try again.
            </div>
          )}
        </div>
      </FilterContext.Provider>
    </div>
  );
};

export default CourseFinderComponent;
