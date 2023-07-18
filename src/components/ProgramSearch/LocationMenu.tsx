import React, { useEffect, useContext, useState } from "react";
import { FilterContext } from "./ProgramFilter";
import { updateFilter } from "./helpers";

export default function LocationMenu() {
  const filterContext = useContext(FilterContext);
  const filteredPrograms = filterContext?.filteredPrograms;
  const selectedOptions = filterContext?.selectedOptions;
  const setSelectedOptions = filterContext?.setSelectedOptions;

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
        onClick={() =>
          updateFilter(
            "location",
            element,
            selectedOptions,
            setSelectedOptions,
            "province"
          )
        }
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
        onClick={() =>
          updateFilter(
            "location",
            element,
            selectedOptions,
            setSelectedOptions,
            "city"
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
      {provinceButtons}
      {provinceButtons.length === 1 && cityButtons}
      <button
        className="m-1 rounded border-2 border-red-600 p-2 capitalize"
        onClick={() => {
          updateFilter(
            "location",
            { province: "", city: "", area: "" },
            selectedOptions,
            setSelectedOptions
          );
        }}
      >
        RESET
      </button>
    </div>
  );
}
