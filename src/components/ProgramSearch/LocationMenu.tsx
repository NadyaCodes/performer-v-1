import React, { useEffect, useContext, useState } from "react";
import { FilterContext } from "./CourseFinderComponent";
import Menu from "./Menu";

export default function LocationMenu() {
  const filterContext = useContext(FilterContext);
  const filteredPrograms = filterContext?.filteredPrograms;

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

  return (
    <div className="flex flex-col">
      {provinces.length > 1 && (
        <Menu
          valueArray={provinces}
          menuType="location"
          locationType="province"
        />
      )}

      {provinces.length === 1 && (
        <Menu valueArray={cities} menuType="location" locationType="city" />
      )}
    </div>
  );
}
