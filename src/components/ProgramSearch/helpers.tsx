import { LocationObject, FilterContextValue, ProgramWithInfo } from "./types";

export const displayDisciplineText = (discipline: string) => {
  const disciplineObject: Record<string, string> = {
    dance: "Dancing",
    act: "Acting",
    sing: "Singing",
    mt: "Musical Theatre",
  };

  return disciplineObject[discipline];
};

export const displayLocation = (locationObject: LocationObject) => {
  let finalString = "";
  if (locationObject.city) {
    finalString += locationObject.city + ", ";
  }
  if (locationObject.province) {
    finalString += locationObject.province;
  }

  return finalString;
};

export const updateFilter = (
  element: string,
  inputtedValue: string | LocationObject,
  options: FilterContextValue | undefined,
  setOptions: ((options: FilterContextValue) => void) | undefined,
  subValue?: string
) => {
  if (options && setOptions) {
    !subValue && setOptions({ ...options, [element]: inputtedValue });
    subValue &&
      setOptions({
        ...options,
        location: { ...options.location, [subValue]: inputtedValue },
      });
  }
};

export const filterPrograms = (
  programs: ProgramWithInfo[],
  options: FilterContextValue
) => {
  let tempFilteredPrograms = [...programs];
  if (options.type) {
    tempFilteredPrograms = tempFilteredPrograms?.filter((program) => {
      return program?.type === options.type;
    });
  }

  if (options.discipline) {
    tempFilteredPrograms = tempFilteredPrograms?.filter((program) => {
      return program?.discipline === options.discipline;
    });
  }

  if (options.location.province) {
    tempFilteredPrograms = tempFilteredPrograms?.filter((program) => {
      return program?.cityObj?.province === options.location.province;
    });
  }

  if (options.location.city) {
    tempFilteredPrograms = tempFilteredPrograms?.filter((program) => {
      return program?.cityObj?.city === options.location.city;
    });
  }

  return tempFilteredPrograms;
};
