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

export type NewSchoolLocationSubmission = {
  city: string;
  province: string;
  website: string;
  discipline: ("sing" | "dance" | "act" | "mt")[];
  type: ("pt" | "ft")[];
  programName?: string;
};

export type NewProgramSubmission = {
  schoolName: string;
  schoolLocation: NewSchoolLocationSubmission[];
};
