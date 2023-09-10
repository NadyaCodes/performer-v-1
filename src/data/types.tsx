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

export type SelectNextProps = {
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
  articlePitch?: string | null;
  elevatorPitch?: string | null;
};

export type PageDataProps = {
  style: string;
  discipline: string;
  city: string;
  province: string;
};

export type PathsArray = {
  params: SelectNextProps;
};

export type ObjectList = { [key: string]: string };
