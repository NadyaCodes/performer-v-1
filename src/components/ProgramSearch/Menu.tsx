import React, { useContext } from "react";
import { updateFilter } from "./helpers";
import { FilterContext } from "./ProgramFilter";

export default function Menu({
  valueArray,
  menuType,
  locationType,
}: {
  valueArray: string[];
  menuType: string;
  locationType?: string;
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
    const bgColor = element === selectedOptions?.type ? "bg-green-400" : "";

    const classString = `w-full p-2 capitalize ${bgColor} hover:bg-green-400`;
    return (
      <button
        className={classString}
        onClick={() =>
          updateFilter(
            menuType,
            element,
            selectedOptions,
            setSelectedOptions,
            locationType && locationType
          )
        }
        key={element}
      >
        {displayText(element)}
      </button>
    );
  });
  return (
    <div className="w-100 flex w-full flex-col items-center bg-green-100 shadow-lg">
      {locationType === "city" && (
        <div className="flex w-full justify-center bg-green-500 p-2 capitalize">
          {selectedOptions?.location.province}
        </div>
      )}
      {buttonList}
      <button
        className="w-full bg-red-300 p-2 capitalize hover:bg-red-400"
        onClick={() =>
          updateFilter(menuType, "", selectedOptions, setSelectedOptions)
        }
      >
        RESET {menuType.toUpperCase()}
      </button>
    </div>
  );
}
