import React, { useState, useContext } from "react";
import { FilterContext } from "./CourseFinderComponent";
import { ProgramWithInfo } from "./types";
import { filterPrograms } from "./helpers";

export default function Search() {
  const filterContext = useContext(FilterContext);
  const setFilteredPrograms = filterContext?.setFilteredPrograms;
  const allPrograms = filterContext?.allPrograms;
  const selectedOptions = filterContext?.selectedOptions;
  const [searchTerm, setSearchTerm] = useState("");

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
      setSearchTerm("");
    }
  };

  return (
    <div className="z-20 m-2 flex w-96">
      <input
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow-md focus:outline-none"
        id="username"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="mx-2 rounded border-2 border-cyan-700 px-2 hover:scale-105 hover:border-cyan-700 hover:bg-cyan-900"
        onClick={() => searchForValue(searchTerm)}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          const element = e.target as HTMLButtonElement;
          element.style.boxShadow = "inset 0px -2px 3px rgba(10,255,255,0.5)";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          const element = e.target as HTMLButtonElement;
          element.style.boxShadow = "";
        }}
      >
        Search
      </button>
    </div>
  );
}
