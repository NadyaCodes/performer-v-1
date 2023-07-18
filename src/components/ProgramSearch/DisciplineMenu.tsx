import React, { useContext } from "react";
import { FilterContext } from "./ProgramFilter";
import { updateFilter } from "./helpers";

export default function DisciplineMenu() {
  const filterContext = useContext(FilterContext);
  const selectedOptions = filterContext?.selectedOptions;
  const setSelectedOptions = filterContext?.setSelectedOptions;
  const disciplineArray = ["act", "sing", "dance", "mt"];

  const disciplineButtons = disciplineArray.map((element) => {
    const bgColor =
      element === selectedOptions?.discipline ? "bg-green-400" : "";

    const classString = `m-1 rounded border-2 border-green-300 p-2 capitalize ${bgColor}`;
    return (
      <button
        className={classString}
        onClick={() =>
          updateFilter(
            "discipline",
            element,
            selectedOptions,
            setSelectedOptions
          )
        }
        key={element}
      >
        {element}
      </button>
    );
  });
  return (
    <div className="flex flex-col">
      {disciplineButtons}
      <button
        className="m-1 rounded border-2 border-red-600 p-2 capitalize"
        onClick={() =>
          updateFilter("discipline", "", selectedOptions, setSelectedOptions)
        }
      >
        RESET
      </button>
    </div>
  );
}
