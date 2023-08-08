import React, { useContext } from "react";
import { FilterContext } from "./CourseFinderComponent";
import { stylesFull, disciplinesFull } from "@component/data/constants";
import { FilterContextValue } from "./types";
import { faceFrown, xMark } from "@component/data/svgs";

export default function TermsDisplay({
  num,
  defaultFilterContext,
}: {
  num: number;
  defaultFilterContext: FilterContextValue;
}) {
  const filterContext = useContext(FilterContext);

  const undoSearch = () => {
    filterContext?.setActiveSearchTerm("");
    filterContext?.setSearchTerm("");
    filterContext?.setSelectedOptions(
      JSON.parse(JSON.stringify(filterContext?.selectedOptions))
    );
  };

  return (
    <div className="m-4 flex w-1/3 flex-col rounded border border-indigo-300 p-4 shadow-2xl">
      <div className="my-2 w-full rounded-md bg-indigo-200 p-2 text-center">
        {num > 1 && (
          <div className="h2">
            There are {num} programs that fit your queries
          </div>
        )}
        {num === 1 && (
          <div className="h2">
            There is {num} program that fits your queries
          </div>
        )}

        {num === 0 && <div className="h2 flex justify-center">{faceFrown}</div>}
      </div>

      <div className="mx-10 flex flex-col capitalize">
        <div className="m-0.5 flex justify-between">
          <span className="h-8">Type</span>
          {filterContext?.selectedOptions.type && (
            <span
              className="flex items-center transition-all"
              style={{ animation: "fadeIn .2s linear" }}
            >
              {stylesFull[filterContext.selectedOptions.type]}
              <div
                onClick={() => {
                  filterContext?.setSelectedOptions({
                    ...filterContext.selectedOptions,
                    type: "",
                  });
                }}
                className="flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </span>
          )}
        </div>
        <div className="m-0.5 flex justify-between">
          <span className="h-8">Discipline</span>
          {filterContext?.selectedOptions.discipline && (
            <span
              className="flex items-center transition-all"
              style={{ animation: "fadeIn .2s linear" }}
            >
              {disciplinesFull[filterContext.selectedOptions.discipline]}
              <div
                onClick={() => {
                  filterContext?.setSelectedOptions({
                    ...filterContext.selectedOptions,
                    discipline: "",
                  });
                }}
                className="flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </span>
          )}
        </div>
        <div className="m-0.5 flex justify-between">
          <span className="h-8">Province</span>
          {filterContext?.selectedOptions.location.province && (
            <span
              className="flex items-center transition-all"
              style={{ animation: "fadeIn .2s linear" }}
            >
              {filterContext.selectedOptions.location.province}
              <div
                onClick={() => {
                  filterContext?.setSelectedOptions({
                    ...filterContext.selectedOptions,
                    location: {
                      province: "",
                      city: "",
                    },
                  });
                }}
                className="flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </span>
          )}
        </div>

        <div className="flex justify-between">
          <span className="h-8">City</span>
          {filterContext?.selectedOptions.location.city && (
            <span
              className="flex items-center transition-all"
              style={{ animation: "fadeIn .2s linear" }}
            >
              {filterContext.selectedOptions.location.city}
              <div
                onClick={() => {
                  filterContext?.setSelectedOptions({
                    ...filterContext.selectedOptions,
                    location: {
                      ...filterContext.selectedOptions.location,
                      city: "",
                    },
                  });
                }}
                className="flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </span>
          )}
        </div>

        <div className="flex justify-between normal-case">
          <span className="h-8">Search Term</span>

          {filterContext?.activeSearchTerm && (
            <span
              className="flex items-center transition-all"
              style={{ animation: "fadeIn .2s linear" }}
            >
              {filterContext.activeSearchTerm}
              <div
                onClick={() => undoSearch()}
                className="flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </span>
          )}
        </div>
        <button
          className=" hover:outline-c my-2 place-self-end rounded px-3 py-1 text-indigo-900 outline outline-indigo-900 hover:scale-110 hover:bg-indigo-900 hover:text-indigo-50"
          onClick={() => {
            filterContext?.setSelectedOptions(defaultFilterContext);
            filterContext?.setSearchTerm("");
            filterContext?.setActiveSearchTerm("");
          }}
        >
          Reset All
        </button>
      </div>
    </div>
  );
}
