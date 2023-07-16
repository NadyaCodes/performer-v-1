import React from "react";

export default function TypeMenu({
  updateFilter,
}: {
  updateFilter: (element: string, value: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <button
        className="m-1 rounded border-2 border-green-300 p-2 capitalize"
        onClick={() => updateFilter("type", "pt")}
      >
        Part Time
      </button>
      <button
        className="m-1 rounded border-2 border-green-300 p-2 capitalize"
        onClick={() => updateFilter("type", "ft")}
      >
        Full Time
      </button>
      <button
        className="m-1 rounded border-2 border-red-600 p-2 capitalize"
        onClick={() => updateFilter("type", "")}
      >
        RESET
      </button>
    </div>
  );
}
