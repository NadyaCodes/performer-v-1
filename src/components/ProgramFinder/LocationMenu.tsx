import React, {
  useEffect,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { FilterContext } from "./ProgramFinderComponent";
import Menu from "./Menu";

export default function LocationMenu({
  setMenu,
}: {
  setMenu: Dispatch<SetStateAction<false | string>>;
}) {
  const filterContext = useContext(FilterContext);
  const filteredPrograms = filterContext?.filteredPrograms;
  const allPrograms = filterContext?.allPrograms;
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

    allProvinces.sort((a, b) => {
      const nameA = a || "";
      const nameB = b || "";

      return nameA.localeCompare(nameB);
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
      if (allCities.length !== 1) {
        allCities.sort((a, b) => {
          const nameA = a || "";
          const nameB = b || "";

          return nameA.localeCompare(nameB);
        });
        setCities(allCities);
      } else {
        const filteredTypes = allPrograms?.map((program) => {
          if (selectedOptions?.type && program.type === selectedOptions.type) {
            return program;
          } else if (!selectedOptions?.type) {
            return program;
          }
        });

        const filteredDisciplines = filteredTypes?.map((program) => {
          if (
            selectedOptions?.discipline &&
            program?.discipline === selectedOptions.discipline
          ) {
            return program;
          } else if (!selectedOptions?.discipline) {
            return program;
          }
        });

        const filteredProvinces = filteredDisciplines?.map((program) => {
          if (
            selectedOptions?.location.province &&
            selectedOptions.location.province === program?.cityObj?.province
          ) {
            return program;
          }
        });

        const allCities: string[] = [];

        filteredProvinces?.forEach((program) => {
          if (program && program.cityObj) {
            !allCities.includes(program.cityObj.city) &&
              allCities.push(program.cityObj.city);
          }
        });
        allCities.sort((a, b) => {
          const nameA = a || "";
          const nameB = b || "";

          return nameA.localeCompare(nameB);
        });
        setCities(allCities);
      }
    }
  }, [
    provinces,
    allPrograms,
    filteredPrograms,
    selectedOptions?.discipline,
    selectedOptions?.location.province,
    selectedOptions?.type,
  ]);

  return (
    <div className="flex flex-col">
      {provinces.length > 1 && (
        <Menu
          valueArray={provinces}
          menuType="location"
          locationType="province"
        />
      )}

      {provinces.length <= 1 && (
        <Menu
          valueArray={cities.length >= 1 ? cities : ["No Available Programs"]}
          menuType="location"
          locationType="city"
          setMenu={setMenu}
        />
      )}
    </div>
  );
}
