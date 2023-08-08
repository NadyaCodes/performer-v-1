import React, { useContext, useEffect } from "react";
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
  // const [animateNum, setAnimateNum] = useState(false);

  const undoSearch = () => {
    filterContext?.setActiveSearchTerm("");
    filterContext?.setSearchTerm("");
    filterContext?.setSelectedOptions(
      JSON.parse(JSON.stringify(filterContext?.selectedOptions))
    );
  };

  useEffect(() => {
    setTimeout(() => {
      const spanElement1 = document.getElementById("num");
      const spanElement2 = document.getElementById("num2");

      if (spanElement1) {
        spanElement1.style.animation = "wiggle .3s linear infinite";
        spanElement1.style.color = "#ec407a";

        const animationTimeout = setTimeout(() => {
          spanElement1.style.animation = "";
          spanElement1.style.color = "black";
        }, 1000);

        return () => {
          clearTimeout(animationTimeout);
        };
      }

      if (spanElement2) {
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
    <div className="sticky top-20 m-4 flex h-fit w-4/12 flex-col rounded border border-indigo-300 px-5 py-2 shadow-md shadow-indigo-500">
      <div className="my-2 w-full place-self-center rounded-md bg-indigo-200 p-2 text-center text-black shadow-md shadow-indigo-900">
        {num > 1 && (
          <div className="h2 flex justify-center">
            There are
            <div className="px-2" id="num">
              {num}
            </div>
            programs that fit your queries
          </div>
        )}
        {num === 1 && (
          <div className="h2 flex justify-center">
            There is
            <div className="px-2" id="num2">
              {num}
            </div>
            program that fits your queries
          </div>
        )}

        {num === 0 && <div className="h2 flex justify-center">{faceFrown}</div>}
      </div>

      <div className="ml-10 mr-5 flex flex-col capitalize">
        <div className="flex justify-between">
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
                className="ml-2 flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </span>
          )}
        </div>
        <div className="flex justify-between">
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
                className=" ml-2 flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </span>
          )}
        </div>
        <div className="flex justify-between">
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
                className="ml-2 flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
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
                className="ml-2 flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
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
                className="ml-2 flex scale-50 justify-center rounded-sm border border-pink-400 text-pink-500 hover:bg-pink-200"
              >
                {xMark}
              </div>
            </span>
          )}
        </div>
        <button
          className="hover:outline-c mb-3 mt-6 w-2/3  place-self-center rounded px-3 py-1 text-indigo-900 outline outline-indigo-900 hover:scale-110 hover:bg-indigo-900 hover:text-indigo-50"
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
