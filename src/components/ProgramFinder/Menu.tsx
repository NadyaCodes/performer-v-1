import React, { SetStateAction, useContext, Dispatch } from "react";
import { updateFilter } from "./helpers";
import { FilterContext } from "./CourseFinderComponent";

export default function Menu({
  valueArray,
  menuType,
  locationType,
  setMenu,
}: {
  valueArray: string[];
  menuType: string;
  locationType?: string;
  setMenu?: Dispatch<SetStateAction<boolean>>;
}) {
  const filterContext = useContext(FilterContext);
  const selectedOptions = filterContext?.selectedOptions;
  const setSelectedOptions = filterContext?.setSelectedOptions;

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
    const bgColor =
      (element === selectedOptions?.type && "bg-cyan-700 text-cyan-50") ||
      (element === selectedOptions?.discipline && "bg-cyan-700 text-cyan-50") ||
      (element === selectedOptions?.location.province &&
        "bg-cyan-800 text-cyan-50") ||
      (element === selectedOptions?.location.city &&
        "bg-cyan-800 text-cyan-50") ||
      (element === "No Available Locations" && "bg-indigo-400 text-cyan-50") ||
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
          if (element !== "No Available Locations") {
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
  });
  return (
    <div
      className="absolute z-30 flex w-96 flex-col items-center bg-cyan-100 text-cyan-950 shadow-lg transition-all"
      style={{ animation: "pullDownTop .3s linear" }}
    >
      {buttonList}
      {valueArray[0] !== "No Available Locations" && (
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
      )}
    </div>
  );
}