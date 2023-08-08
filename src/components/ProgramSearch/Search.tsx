import React, { useContext } from "react";
import { FilterContext } from "./CourseFinderComponent";

import { search, xMark } from "@component/data/svgs";
import { searchForValue } from "./helpers";

export default function Search() {
  const filterContext = useContext(FilterContext);

  const setSearchResults = (value: string) => {
    if (filterContext) {
      const filteredProgramsArray = searchForValue(value, filterContext);
      filterContext?.setFilteredPrograms(filteredProgramsArray);
      filterContext?.setActiveSearchTerm(value);
    }
  };

  return (
    <div className="z-20 mb-3 mt-7 flex justify-around">
      {!filterContext?.activeSearchTerm ? (
        <div className="flex">
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
            className="mx-5 flex h-10 items-center rounded px-3 outline outline-cyan-700 hover:scale-105 hover:text-indigo-200 hover:outline-indigo-200"
            style={{ boxShadow: "none" }}
            onClick={() => setSearchResults(filterContext?.searchTerm || "")}
          >
            <span className="p-1">Search</span>
            <span className="p-1">{search}</span>
          </button>
        </div>
      ) : (
        <button
          className=" mx-5 flex h-10 items-center justify-center rounded px-3 outline outline-pink-400 hover:scale-105 hover:text-indigo-200 hover:outline-indigo-200"
          style={{ boxShadow: "none" }}
          onClick={() => {
            setSearchResults("");
            filterContext?.setSearchTerm("");
          }}
        >
          <span className="p-1">
            Clear Search Term:{" "}
            <span className="ml-2">{filterContext?.activeSearchTerm}</span>
          </span>
          <span className="p-1">{xMark}</span>
        </button>
      )}
    </div>
  );
}
