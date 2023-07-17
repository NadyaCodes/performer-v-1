import React, { useContext } from "react";
import { FilterContext } from "./ProgramFilter";

export default function DisciplineMenu({
  updateFilter,
}: {
  updateFilter: (element: string, value: string) => void;
}) {
  const filterContext = useContext(FilterContext);
  const selectedOptions = filterContext?.selectedOptions;
  const disciplineArray = ["act", "sing", "dance", "mt"];

  const disciplineButtons = disciplineArray.map((element) => {
    const bgColor =
      element === selectedOptions?.discipline ? "bg-green-400" : "";

    const classString = `m-1 rounded border-2 border-green-300 p-2 capitalize ${bgColor}`;
    return (
      <button
        className={classString}
        onClick={() => updateFilter("discipline", element)}
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
        onClick={() => updateFilter("discipline", "")}
      >
        RESET
      </button>
    </div>
  );
}
