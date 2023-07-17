import React, { useEffect, useContext, useState } from "react";
import { FilterContext, LocationObject } from "./ProgramFilter";

export default function LocationMenu({
  updateFilter,
}: {
  updateFilter: (
    element: string,
    inputtedValue: LocationObject | string,
    subValue?: string
  ) => void;
}) {
  const filterContext = useContext(FilterContext);
  const filteredPrograms = filterContext?.filteredPrograms;
  const selectedOptions = filterContext?.selectedOptions;

  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

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

  useEffect(() => {
    if (provinces.length === 1) {
      const allCities: string[] = [];

      filteredPrograms?.forEach((program) => {
        if (program.cityObj) {
          !allCities.includes(program.cityObj.city) &&
            allCities.push(program.cityObj.city);
        }
      });
      setCities(allCities);
    }
  }, [provinces]);

  const provinceButtons = provinces.map((element) => {
    const bgColor =
      element === selectedOptions?.location.province ? "bg-green-400" : "";

    const classString = `m-1 rounded border-2 border-green-300 p-2 capitalize ${bgColor}`;
    return (
      <button
        className={classString}
        onClick={() => updateFilter("location", element, "province")}
        key={element}
      >
        {element}
      </button>
    );
  });

  const cityButtons = cities.map((element) => {
    const bgColor =
      element === selectedOptions?.location.city ? "bg-green-600" : "";

    const classString = `m-1 rounded border-2 border-green-300 p-2 capitalize ${bgColor}`;
    return (
      <button
        className={classString}
        onClick={() => updateFilter("location", element, "city")}
        key={element}
      >
        {element}
      </button>
    );
  });

  return (
    <div className="flex flex-col">
      {provinceButtons}
      {provinceButtons.length === 1 && cityButtons}
      <button
        className="m-1 rounded border-2 border-red-600 p-2 capitalize"
        onClick={() => {
          updateFilter("location", { province: "", city: "", area: "" });
        }}
      >
        RESET
      </button>
    </div>
  );
}
