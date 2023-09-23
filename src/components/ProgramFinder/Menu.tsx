import React, { type SetStateAction, useContext, type Dispatch } from "react";
import { updateFilter } from "./helpers";
import { FilterContext } from "./ProgramFinderComponent";
import type { FilterContextValue } from "./types";

export default function Menu({
  valueArray,
  menuType,
  locationType,
  setMenu,
}: {
  valueArray: string[];
  menuType: string;
  locationType?: string;
  setMenu?: Dispatch<SetStateAction<string | false>>;
}) {
  const filterContext = useContext(FilterContext);
  const selectedOptions = filterContext?.selectedOptions;
  const setSelectedOptions = filterContext?.setSelectedOptions
    ? (options: FilterContextValue) => filterContext.setSelectedOptions(options)
    : undefined;

  const displayText = (element: string) => {
    switch (element) {
      case "pt":
        return "Part Time";
      case "ft":
        return "Full Time";
      case "act":
        return "Acting";
      case "sing":
        return "Singing";
      case "mt":
        return "Musical Theatre";
      default:
        return element;
    }
  };

  const buttonList = valueArray.map((element) => {
    if (filterContext?.setSelectedOptions) {
      const bgColor =
        (element === selectedOptions?.type && "bg-cyan-700 text-cyan-50") ||
        (element === selectedOptions?.discipline &&
          "bg-cyan-700 text-cyan-50") ||
        (element === selectedOptions?.location.province &&
          "bg-cyan-800 text-cyan-50") ||
        (element === selectedOptions?.location.city &&
          "bg-cyan-800 text-cyan-50") ||
        (element === "No Available Locations" &&
          "bg-indigo-400 text-cyan-50") ||
        "";

      const hover =
        element === "No Available Locations"
          ? ""
          : "hover:bg-cyan-200 hover:text-cyan-950 focus:bg-cyan-700 focus:text-cyan-50";

      const classString = `w-full p-2 capitalize ${bgColor} ${hover}`;
      return (
        <button
          className={classString}
          onClick={() => {
            if (element !== "No Available Programs") {
              updateFilter(
                menuType,
                element,
                selectedOptions,
                setSelectedOptions,
                locationType
              );
              setMenu && setMenu(false);
            }
          }}
          key={element}
        >
          {displayText(element)}
        </button>
      );
    }
  });

  return (
    <div
      className="absolute z-40 max-h-96 w-64 items-center overflow-y-scroll bg-cyan-100 text-cyan-950 shadow-lg transition-all  md:w-52 lg:w-64 xl:w-96"
      style={{ animation: "pullDownTop .3s linear" }}
    >
      <div style={{ transform: "translate3d(0,0,0)" }}>
        {buttonList}
        <button
          className="w-full bg-indigo-300 p-2 capitalize hover:bg-indigo-900 hover:text-indigo-50"
          onClick={() => {
            {
              updateFilter(menuType, "", selectedOptions, setSelectedOptions);
              setMenu && setMenu(false);
            }
          }}
        >
          RESET {menuType.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
