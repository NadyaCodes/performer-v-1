import React, { useState, useContext } from "react";
import { FilterContext } from "./ProgramFilter";
import { ProgramWithInfo } from "./ProgramFilter";

export default function Search() {
  const filterContext = useContext(FilterContext);
  const filteredPrograms = filterContext?.filteredPrograms;
  const setFilteredPrograms = filterContext?.setFilteredPrograms;
  const [searchTerm, setSearchTerm] = useState("");

  const searchForValue = (value: string) => {
    if (filteredPrograms && setFilteredPrograms) {
      const newFilteredPrograms = filteredPrograms.map((program) => {
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
    <div className="m-2 flex">
      <input
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        id="username"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="mx-2 rounded border-2 border-green-300 px-2"
        onClick={() => searchForValue(searchTerm)}
      >
        Search
      </button>
    </div>
  );
}
