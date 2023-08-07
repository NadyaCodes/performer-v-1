import React, { useState, useContext } from "react";
import { FilterContext } from "./CourseFinderComponent";
import { ProgramWithInfo } from "./types";
import { filterPrograms } from "./helpers";
import { search, xMark } from "@component/data/svgs";

export default function Search() {
  const filterContext = useContext(FilterContext);
  const setFilteredPrograms = filterContext?.setFilteredPrograms;
  const allPrograms = filterContext?.allPrograms;
  const selectedOptions = filterContext?.selectedOptions;
  // const {searchTerm, setSearchTerm} = useContext(FilterContext)

  // const [searchTerm, setSearchTerm] = useState("");

  const searchForValue = (value: string) => {
    if (setFilteredPrograms && allPrograms && selectedOptions) {
      const resetSearchFilterPrograms = filterPrograms(
        allPrograms,
        selectedOptions
      );
      const newFilteredPrograms = resetSearchFilterPrograms.map((program) => {
        if (
          program?.website?.includes(value.toLowerCase()) ||
          program?.name?.includes(value.toLowerCase()) ||
          (program?.cityObj &&
            program.cityObj.city.includes(value.toLowerCase())) ||
          (program?.cityObj &&
            program.cityObj.province.includes(value.toLowerCase())) ||
          (program?.schoolObj &&
            program.schoolObj.name.includes(value.toLowerCase()))
        ) {
          return program;
        }
        return null;
      });

      const filteredProgramsArray = newFilteredPrograms.filter(
        (program): program is ProgramWithInfo => program !== null
      );
      setFilteredPrograms(filteredProgramsArray);
      filterContext && filterContext.setActiveSearchTerm(value);
    }
  };

  return (
    <div className="z-20 mb-3 mt-7 flex justify-around">
      <input
        className="focus:shadow-outline w-96 max-w-6xl appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-md focus:outline-none"
        id="username"
        type="text"
        placeholder="Search"
        value={(filterContext && filterContext.searchTerm) || ""}
        onChange={(e) =>
          filterContext && filterContext.setSearchTerm(e.target.value)
        }
      />
      <button
        className="mx-5 flex items-center rounded px-3 outline outline-cyan-700 hover:scale-105 hover:text-indigo-200 hover:outline-indigo-200"
        style={{ boxShadow: "none" }}
        onClick={() =>
          filterContext && searchForValue(filterContext?.searchTerm)
        }
      >
        <span className="p-1">Search</span>
        <span className="p-1">{search}</span>
      </button>
      <button
        className="mx-1 flex items-center justify-center rounded px-3 outline outline-pink-400 hover:scale-105 hover:text-indigo-200 hover:outline-indigo-200"
        style={{ boxShadow: "none" }}
        onClick={() => {
          searchForValue("");
          filterContext?.setActiveSearchTerm("");
          filterContext?.setSearchTerm("");
        }}
      >
        <span className="p-1">Clear Search Term</span>
        <span className="p-1">{xMark}</span>
      </button>
    </div>
  );
}
