import React, { useContext, useEffect } from "react";
import { FilterContext } from "./CourseFinderComponent";
import { stylesFull, disciplinesFull } from "@component/data/constants";
import { FilterContextValue } from "./types";
import { faceFrown, xMark } from "@component/data/svgs";

export default function TermsDisplay({
  num,
  defaultFilterContext,
  idTag,
}: {
  num: number;
  defaultFilterContext: FilterContextValue;
  idTag: string;
}) {
  const filterContext = useContext(FilterContext);

  const undoSearch = () => {
    filterContext?.setActiveSearchTerm("");
    filterContext?.setSearchTerm("");
    filterContext?.setSelectedOptions(
      JSON.parse(JSON.stringify(filterContext?.selectedOptions))
    );
  };

  useEffect(() => {
    console.log("useEffect running");
    setTimeout(() => {
      const spanElement1 = document.getElementById(`num${idTag}`);
      const spanElement2 = document.getElementById(`num2${idTag}`);

      if (spanElement1) {
        spanElement1.style.animation = "wiggle .3s linear infinite";
        spanElement1.style.color = "#ec407a";

        const animationTimeout = setTimeout(() => {
          console.log("setTimeout running");
          spanElement1.style.animation = "";
          spanElement1.style.color = "black";
        }, 1000);

        return () => {
          clearTimeout(animationTimeout);
        };
      }

      if (spanElement2) {
        console.log("running animation 2");
        spanElement2.style.animation = "wiggle .3s linear infinite";
        spanElement2.style.color = "#ec407a";

        const animationTimeout = setTimeout(() => {
          spanElement2.style.animation = "";
          spanElement2.style.color = "black";
        }, 1000);

        return () => {
          clearTimeout(animationTimeout);
        };
      }
    });
  }, [filterContext?.activeSearchTerm, filterContext?.selectedOptions]);

  return (
    <div className="sticky top-20 flex flex-col rounded border border-indigo-300 shadow-md shadow-indigo-300 md:px-5 md:py-2">
      <div className="w-full place-self-center bg-indigo-200 p-2 text-center text-black shadow-md shadow-indigo-900 md:rounded-md">
        {num > 1 && (
          <div className="h2 flex flex-col items-center justify-center md:flex-row">
            <div className="flex items-center">
              <div>There are</div>
              <div className="px-2 text-xl" id={`num${idTag}`}>
                {num}
              </div>
            </div>
            <div>programs that fit your queries</div>
          </div>
        )}
        {num === 1 && (
          <div className="h2 flex flex-col items-center justify-center md:flex-row">
            <div className="flex items-center">
              <div>There is</div>
              <div className="px-2 text-xl" id={`num2${idTag}`}>
                {num}
              </div>
            </div>
            <div>program that fits your queries</div>
          </div>
        )}

        {num === 0 && <div className="h2 flex justify-center">{faceFrown}</div>}
      </div>

      <div className="ml-3 mt-2 flex flex-col capitalize md:ml-6 md:mt-0">
        <div className="flex items-center justify-between">
          <span className="flex h-9 w-28 items-center">Type</span>
          {filterContext?.selectedOptions.type && (
            <>
              <span className="ml-2 w-7/12 break-words text-end">
                {stylesFull[filterContext.selectedOptions.type]}
              </span>
              <div
                onClick={() => {
                  filterContext?.setSelectedOptions({
                    ...filterContext.selectedOptions,
                    type: "",
                  });
                }}
                className="flex h-9 w-9 flex-shrink-0 scale-50 items-center justify-center rounded-full border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between capitalize">
          <span className="flex h-9 w-28  items-center">Discipline</span>
          {filterContext?.selectedOptions.discipline && (
            <>
              <span className="ml-2 w-7/12 break-words text-end">
                {disciplinesFull[filterContext.selectedOptions.discipline]}
              </span>
              <div
                onClick={() => {
                  filterContext?.setSelectedOptions({
                    ...filterContext.selectedOptions,
                    discipline: "",
                  });
                }}
                className="flex h-9 w-9 flex-shrink-0 scale-50 items-center justify-center rounded-full border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between capitalize">
          <span className="flex h-9 w-28  items-center ">Province</span>
          {filterContext?.selectedOptions.location.province && (
            <>
              <span className="ml-2 w-7/12 break-words text-end">
                {filterContext.selectedOptions.location.province}
              </span>
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
                className="flex h-9 w-9 flex-shrink-0 scale-50 items-center justify-center rounded-full border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between capitalize">
          <span className="flex h-9 w-28 items-center">City</span>
          {filterContext?.selectedOptions.location.city && (
            <>
              <span className="ml-2 w-7/12 break-words text-end">
                {filterContext.selectedOptions.location.city}
              </span>
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
                className="flex h-9 w-9 flex-shrink-0 scale-50 items-center justify-center rounded-full border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between normal-case">
          <span className="flex h-9 w-28 items-center">Search Term</span>
          {filterContext?.activeSearchTerm && (
            <>
              <span className="ml-2 w-7/12 break-words text-end">
                {filterContext.activeSearchTerm}
              </span>
              <div
                onClick={() => undoSearch()}
                className="flex h-9 w-9 flex-shrink-0 scale-50 items-center justify-center rounded-full border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </>
          )}
        </div>

        <button
          className="hover:outline-c mb-3 mt-3 w-2/3 place-self-center  rounded px-3 py-1 text-indigo-900 outline outline-indigo-900 hover:scale-110 hover:bg-indigo-900 hover:text-indigo-50 md:mt-6"
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
