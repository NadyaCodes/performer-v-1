import React, { useContext } from "react";
import { FilterContext } from "./ProgramFinderComponent";

import { search, xMark } from "@component/data/svgs";
import { searchForValue } from "./helpers";

export default function Search({ menu }: { menu: string | false }) {
  const filterContext = useContext(FilterContext);

  const setSearchResults = (value: string) => {
    if (filterContext) {
      const filteredProgramsArray = searchForValue(value, filterContext);
      filterContext?.setFilteredPrograms(filteredProgramsArray);
      filterContext?.setActiveSearchTerm(value);
    }
  };

  return (
    <div
      className={`z-20 mb-3 mt-7 flex justify-around ${
        menu ? " opacity-0" : ""
      }`}
    >
      {!filterContext?.activeSearchTerm ? (
        <div className="flex flex-col md:flex-row">
          <div className="mb-1 flex flex-col">
            <input
              className="focus:shadow-outline w-72 max-w-6xl appearance-none rounded border bg-cyan-50 px-3 py-2 leading-tight text-gray-700 shadow-md focus:outline-none md:w-96"
              id="username"
              type="text"
              placeholder="Search"
              value={(filterContext && filterContext.searchTerm) || ""}
              onChange={(e) =>
                filterContext && filterContext.setSearchTerm(e.target.value)
              }
            />
            <div className="font-sm italic text-pink-400">*Exact match*</div>
          </div>
          <button
            className="mx-5 my-2 flex h-10 items-center justify-center rounded p-3 text-center outline outline-cyan-700 hover:scale-105 hover:text-indigo-200 hover:outline-indigo-200 lg:my-0 lg:px-3"
            style={{ boxShadow: "none" }}
            onClick={() => setSearchResults(filterContext?.searchTerm || "")}
          >
            <span className="p-1">Search</span>
            <span className="p-1">{search}</span>
          </button>
        </div>
      ) : (
        <button
          className="mx-5 flex h-fit items-center justify-center rounded px-3 py-2 text-indigo-200 outline outline-indigo-200 hover:scale-105 hover:text-pink-100 hover:outline-pink-100"
          style={{ boxShadow: "none" }}
          onClick={() => {
            setSearchResults("");
            filterContext?.setSearchTerm("");
          }}
        >
          <span className="flex flex-col p-1">
            <span>Clear Search Term:</span>
            <span className="ml-2 break-all">
              {filterContext?.activeSearchTerm}
            </span>
          </span>
          <span className="p-1">{xMark}</span>
        </button>
      )}
      {/* <div className="font-sm italic text-ink-500">*Exact match*</div> */}
    </div>
  );
}
