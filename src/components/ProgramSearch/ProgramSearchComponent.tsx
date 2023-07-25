import { createContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { api } from "@component/utils/api";
import ProgramItem from "./ProgramItem";
import FilterMenu from "./FilterMenu";
import { filterPrograms } from "./helpers";
import {
  FilterContextValue,
  FilterContextState,
  ProgramWithInfo,
} from "./types";
import { useSession } from "next-auth/react";

const defaultFilterContext: FilterContextValue = {
  type: "",
  discipline: "",
  location: { province: "", city: "", area: "" },
};

export const FilterContext = createContext<FilterContextState | null>(null);

const ProgramSearchComponent: NextPage = () => {
  const { data: ftProgramData } = api.ftProgram.getAll.useQuery();
  const { data: ptProgramData } = api.ptProgram.getAll.useQuery();
  const { data: schoolLocationData } = api.schoolLocation.getAll.useQuery();
  const { data: schools } = api.school.getAll.useQuery();
  const { data: locations } = api.location.getAll.useQuery();
  const { data: sessionData } = useSession();
  const utils = api.useContext();

  const [allPrograms, setAllPrograms] = useState<ProgramWithInfo[]>([]);
  const [selectedOptions, setSelectedOptions] =
    useState<FilterContextValue>(defaultFilterContext);

  const [programDisplay, setProgramDisplay] = useState<JSX.Element[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramWithInfo[]>(
    []
  );
  const [userFavs, setUserFavs] = useState<string[] | null>(null);

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
    setAllPrograms(tempArray);
  }, [ftProgramData, ptProgramData]);

  //filter and display correct data
  useEffect(() => {
    if (allPrograms) {
      const newFilteredPrograms = filterPrograms(allPrograms, selectedOptions);

      setFilteredPrograms(newFilteredPrograms);

      const tempProgramDisplay: JSX.Element[] = newFilteredPrograms.map(
        (element) => {
          return (
            <ProgramItem
              key={element.id}
              element={element}
              fav={userFavs?.includes(element.id) || false}
              findUserFavs={findUserFavs}
              setUserFavs={setUserFavs}
            />
          );
        }
      );

      setProgramDisplay(tempProgramDisplay);
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
    <div>
      <FilterContext.Provider
        value={{
          selectedOptions,
          setSelectedOptions,
          filteredPrograms,
          setFilteredPrograms,
          allPrograms,
          setProgramDisplay,
        }}
      >
        <FilterMenu />

        <div className="h2">
          There are {programDisplay.length} programs that fit your queries:
        </div>
        <div>
          {selectedOptions.type} {selectedOptions.discipline}{" "}
          {selectedOptions.location.province}
        </div>
        <div className="mx-40">{programDisplay}</div>
      </FilterContext.Provider>
    </div>
  );
};

export default ProgramSearchComponent;
