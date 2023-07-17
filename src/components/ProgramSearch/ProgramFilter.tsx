import { createContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { api } from "@component/utils/api";
import ProgramItem from "./ProgramItem";
import FilterMenu from "./FilterMenu";
import { Location, School } from "@prisma/client";

export type FilterContextValue = {
  type: string;
  discipline: string;
  location: { province: ""; city: ""; area: "" };
};

export type ProgramWithInfo = {
  id: string;
  schoolLocationId: string;
  website: string;
  discipline: string;
  name?: string;
  type: string;
  cityObj?: Location;
  schoolObj?: School;
};

export type FilterContextState = {
  selectedOptions: FilterContextValue;
  setSelectedOptions(selectedOptions: FilterContextValue): void;
  filteredPrograms: ProgramWithInfo[];
};

const defaultFilterContext: FilterContextValue = {
  type: "",
  discipline: "",
  location: { province: "", city: "", area: "" },
};

export const FilterContext = createContext<FilterContextState | null>(null);

const ProgramFilter: NextPage = () => {
  const { data: ftProgramData } = api.ftProgram.getAll.useQuery();
  const { data: ptProgramData } = api.ptProgram.getAll.useQuery();
  const { data: schoolLocationData } = api.schoolLocation.getAll.useQuery();
  const { data: schools } = api.school.getAll.useQuery();
  const { data: locations } = api.location.getAll.useQuery();

  const [allPrograms, setAllPrograms] = useState<ProgramWithInfo[]>([]);
  const [selectedOptions, setSelectedOptions] =
    useState<FilterContextValue>(defaultFilterContext);

  const [programDisplay, setProgramDisplay] = useState<JSX.Element[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramWithInfo[]>(
    []
  );

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
      let tempFilteredPrograms = [...allPrograms];
      if (selectedOptions.type) {
        tempFilteredPrograms = tempFilteredPrograms?.filter((program) => {
          return program?.type === selectedOptions.type;
        });
      }

      if (selectedOptions.discipline) {
        tempFilteredPrograms = tempFilteredPrograms?.filter((program) => {
          return program?.discipline === selectedOptions.discipline;
        });
      }

      setFilteredPrograms(tempFilteredPrograms);

      const tempProgramDisplay: JSX.Element[] = tempFilteredPrograms.map(
        (element) => {
          return <ProgramItem key={element.id} element={element} />;
        }
      );

      setProgramDisplay(tempProgramDisplay);
    }
  }, [selectedOptions, allPrograms]);

  return (
    <div>
      <FilterContext.Provider
        value={{
          selectedOptions,
          setSelectedOptions,
          filteredPrograms,
        }}
      >
        <FilterMenu />
        <div>
          {selectedOptions.type} {selectedOptions.discipline}{" "}
          {selectedOptions.location.province}
        </div>
        <div className="h2">
          There are {programDisplay.length} programs that fit your queries:
        </div>
        <div className="mx-40">{programDisplay}</div>
      </FilterContext.Provider>
    </div>
  );
};

export default ProgramFilter;
