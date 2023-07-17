import React from "react";

export default function DisciplineMenu({
  updateFilter,
}: {
  updateFilter: (element: string, value: string) => void;
}) {
  const disciplineArray = ["act", "sing", "dance", "mt"];

  const disciplineButtons = disciplineArray.map((element) => {
    return (
      <button
        className="m-1 rounded border-2 border-green-300 p-2 capitalize"
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
