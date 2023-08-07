import React, { useContext } from "react";
import { FilterContext } from "./CourseFinderComponent";
import { stylesFull, disciplinesFull } from "@component/data/constants";
import { FilterContextValue } from "./types";

export default function TermsDisplay({
  num,
  defaultFilterContext,
}: {
  num: number;
  defaultFilterContext: FilterContextValue;
}) {
  const filterContext = useContext(FilterContext);
  return (
    <div>
      {num > 1 && (
        <div className="h2">
          There are {num} programs that fit your queries:
        </div>
      )}
      {num === 1 && (
        <div className="h2">There is {num} program that fits your queries:</div>
      )}

      <div className="flex flex-col items-start border-2 capitalize">
        <div className="">
          Type: &nbsp;
          {filterContext?.selectedOptions.type &&
            stylesFull[filterContext.selectedOptions.type]}
        </div>
        <div>
          Discipline: &nbsp;
          {filterContext?.selectedOptions.discipline &&
            disciplinesFull[filterContext.selectedOptions.discipline]}
        </div>
        <div>
          Province: &nbsp;
          {filterContext?.selectedOptions.location.province &&
            filterContext.selectedOptions.location.province}
        </div>

        <div>
          City: &nbsp;
          {filterContext?.selectedOptions.location.city &&
            filterContext.selectedOptions.location.city}
        </div>

        <div>Search Term: &nbsp;{filterContext?.activeSearchTerm}</div>
        <button
          className="my-2 rounded px-3 py-1 outline"
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
