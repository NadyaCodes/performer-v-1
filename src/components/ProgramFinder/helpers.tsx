import type {
  LocationObject,
  FilterContextValue,
  ProgramWithInfo,
  FilterContextState,
} from "./types";
import type { FavProgram } from "@prisma/client";

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

export const searchForValue = (
  value: string,
  filterContext: FilterContextState
) => {
  const resetSearchFilterPrograms = filterPrograms(
    filterContext?.allPrograms,
    filterContext?.selectedOptions
  );
  const newFilteredPrograms = resetSearchFilterPrograms.map((program) => {
    if (
      program?.website?.toLowerCase().includes(value.toLowerCase()) ||
      program?.name?.toLowerCase().includes(value.toLowerCase()) ||
      (program?.cityObj &&
        program.cityObj.city.toLowerCase().includes(value.toLowerCase())) ||
      (program?.cityObj &&
        program.cityObj.province.toLowerCase().includes(value.toLowerCase())) ||
      (program?.schoolObj &&
        program.schoolObj.name.toLowerCase().includes(value.toLowerCase()))
    ) {
      return program;
    }
    return null;
  });

  const filteredProgramsArray = newFilteredPrograms.filter(
    (program): program is ProgramWithInfo => program !== null
  );
  return filteredProgramsArray;
};

export const searchForValueSimple = (
  value: string,
  // filterContext: FilterContextState,
  allPrograms: ProgramWithInfo[],
  selectedOptions: FilterContextValue
) => {
  const resetSearchFilterPrograms = filterPrograms(
    allPrograms,
    selectedOptions
  );
  const newFilteredPrograms = resetSearchFilterPrograms.map((program) => {
    if (
      program?.website?.toLowerCase().includes(value.toLowerCase()) ||
      program?.name?.toLowerCase().includes(value.toLowerCase()) ||
      (program?.cityObj &&
        program.cityObj.city.toLowerCase().includes(value.toLowerCase())) ||
      (program?.cityObj &&
        program.cityObj.province.toLowerCase().includes(value.toLowerCase())) ||
      (program?.schoolObj &&
        program.schoolObj.name.toLowerCase().includes(value.toLowerCase()))
    ) {
      return program;
    }
    return null;
  });

  const filteredProgramsArray = newFilteredPrograms.filter(
    (program): program is ProgramWithInfo => program !== null
  );
  return filteredProgramsArray;
};

export const convertUserFavs = (favsArray: FavProgram[]) => {
  const newArray = favsArray.map((element) => {
    if (element.ftProgramId) {
      return element.ftProgramId;
    }
    if (element.ptProgramId) {
      return element.ptProgramId;
    }
  });

  return newArray;
};
