import { createContext, useContext, useState } from "react";
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

const defaultFilterContext: FilterContextValue = {
  type: "",
  discipline: "",
  location: "",
};

export const FilterContext = createContext<FilterContextState | null>(null);

const ProgramFilter: NextPage = () => {
  const { data: ftProgramData } = api.ftProgram.getAll.useQuery();
  const { data: ptProgramData } = api.ptProgram.getAll.useQuery();

  const [selectedOptions, setSelectedOptions] =
    useState<FilterContextValue>(defaultFilterContext);

  const ftProgramDisplay = ftProgramData?.map((element) => {
    return <ProgramItem key={element.id} element={element} type="ft" />;
  });
  const ptProgramDisplay = ptProgramData?.map((element) => {
    return <ProgramItem key={element.id} element={element} type="pt" />;
  });

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
        <div className="h2">Here are your programs:</div>
        <div className="mx-40">
          {selectedOptions.type === "pt" ? null : ftProgramDisplay}
          {selectedOptions.type === "ft" ? null : ptProgramDisplay}
        </div>
      </FilterContext.Provider>
    </div>
  );
};

export default ProgramFilter;
