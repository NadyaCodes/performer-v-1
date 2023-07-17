import { createContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { api } from "@component/utils/api";
import ProgramItem from "./ProgramItem";
import FilterMenu from "./FilterMenu";

export type FilterContextValue = {
  type: string;
  discipline: string;
  location: string;
};

export type FilterContextState = {
  selectedOptions: FilterContextValue;
  setSelectedOptions(selectedOptions: FilterContextValue): void;
};

export type ProgramWithType = {
  id: string;
  schoolLocationId: string;
  website: string;
  discipline: string;
  name?: string;
  type: string;
};

const defaultFilterContext: FilterContextValue = {
  type: "",
  discipline: "",
  location: "",
};

export const FilterContext = createContext<FilterContextState | null>(null);

const ProgramFilter: NextPage = () => {
  const { data: ftProgramData } = api.ftProgram.getAll.useQuery();
  const { data: ptProgramData } = api.ptProgram.getAll.useQuery();

  const [allPrograms, setAllPrograms] = useState<ProgramWithType[]>([]);
  const [selectedOptions, setSelectedOptions] =
    useState<FilterContextValue>(defaultFilterContext);

  const [programDisplay, setProgramDisplay] = useState<JSX.Element[]>([]);

  //Capture all program data, and add type to object
  useEffect(() => {
    let ftLabelled;
    if (ftProgramData) {
      ftLabelled = ftProgramData?.map((program) => {
        return { ...program, type: "ft" };
      });
    }
    let ptLabelled;
    if (ptProgramData) {
      ptLabelled = ptProgramData?.map((program) => {
        return { ...program, type: "pt" };
      });
    }

    let tempArray: ProgramWithType[] = [];
    ftLabelled && (tempArray = tempArray.concat(ftLabelled));
    ptLabelled && (tempArray = tempArray.concat(ptLabelled));
    setAllPrograms(tempArray);
  }, [ftProgramData, ptProgramData]);

  //filter and display correct data
  useEffect(() => {
    if (allPrograms) {
      let filteredPrograms = [...allPrograms];
      if (selectedOptions.type) {
        filteredPrograms = filteredPrograms?.filter((program) => {
          return program?.type === selectedOptions.type;
        });
      }

      if (selectedOptions.discipline) {
        filteredPrograms = filteredPrograms?.filter((program) => {
          return program?.discipline === selectedOptions.discipline;
        });
      }

      const tempProgramDisplay: JSX.Element[] = filteredPrograms.map(
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
        }}
      >
        <FilterMenu />
        <div>
          {selectedOptions.type} {selectedOptions.discipline}{" "}
          {selectedOptions.location}
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
