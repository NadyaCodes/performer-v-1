import { School, Location } from "@prisma/client";

export type LocationObject = {
  city: string;
  province: string;
  area?: string;
};

export type FilterContextValue = {
  type: string;
  discipline: string;
  location: LocationObject;
};

export type ProgramWithInfo = {
  id: string;
  schoolLocationId: string;
  website: string;
  discipline: string;
  name?: string;
  type: string;
  cityObj?: Location;
  schoolObj?: School;
};

export type FilterContextState = {
  selectedOptions: FilterContextValue;
  setSelectedOptions(selectedOptions: FilterContextValue): void;
  filteredPrograms: ProgramWithInfo[];
  setFilteredPrograms(filteredPrograms: ProgramWithInfo[]): void;
  allPrograms: ProgramWithInfo[];
  setProgramDisplay(programDisplay: JSX.Element[]): void;
};

type DisciplineObject = {
  act: boolean;
  sing: boolean;
  dance: boolean;
  mt: boolean;
};

type TypeObject = {
  pt: boolean;
  ft: boolean;
};

export type NewProgramSubmission = {
  schoolName: string;
  city: string;
  province: string;
  website: string;
  discipline: DisciplineObject;
  type: TypeObject;
  programName?: string;
};
