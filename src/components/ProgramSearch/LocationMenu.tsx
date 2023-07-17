import React, { useEffect, useContext, useState } from "react";
import { FilterContext } from "./ProgramFilter";

export default function LocationMenu({
  updateFilter,
}: {
  updateFilter: (
    element: string,
    inputtedValue: string,
    subValue?: string
  ) => void;
}) {
  const filterContext = useContext(FilterContext);
  const filteredPrograms = filterContext?.filteredPrograms;
  const selectedOptions = filterContext?.selectedOptions;

  const [provinces, setProvinces] = useState<string[]>([]);

  useEffect(() => {
    const allProvinces: string[] = [];

    filteredPrograms?.forEach((program) => {
      if (program.cityObj) {
        !allProvinces.includes(program.cityObj.province) &&
          allProvinces.push(program.cityObj.province);
      }
    });

    setProvinces(allProvinces);
  }, [filteredPrograms]);

  const provinceButtons = provinces.map((element) => {
    const bgColor =
      element === selectedOptions?.location.province ? "bg-green-400" : "";

    const classString = `m-1 rounded border-2 border-green-300 p-2 capitalize ${bgColor}`;
    return (
      <button
        className={classString}
        onClick={() => updateFilter("discipline", element, "province")}
        key={element}
      >
        {element}
      </button>
    );
  });

  return (
    <div className="flex flex-col">
      {provinceButtons}
      <button
        className="m-1 rounded border-2 border-red-600 p-2 capitalize"
        onClick={() => updateFilter("discipline", "")}
      >
        RESET
      </button>
    </div>
  );
}
