export type AllSchoolsLocations = {
  [key: string]: {
    id: string;
    school_id: string;
    location_id: string;
  };
};

export type AllSchools = {
  [key: string]: {
    id: string;
    name: string;
    site: string;
  };
};

export type AllCities = {
  [key: string]: {
    id: string;
    city: string;
    province: string;
    area: string;
  };
};

export type DisciplineProps = {
  style: string;
  discipline?: string;
  city?: string;
  province?: string;
  provincesList?: string[];
  citiesList?: string[];
  pageData?: ProgramDataProp[];
  allProgramsInType?: ProgramDataProp[];
};

export type ProgramDataProp = {
  id: string;
  school_location_id: string;
  site: string;
  type: string;
  style: string;
  program?: string;
};

export type PageDataProps = {
  style: string;
  discipline: string;
  city: string;
  province: string;
};

export type PathsArray = {
  params: DisciplineProps;
};

export type ObjectList = { [key: string]: string };
