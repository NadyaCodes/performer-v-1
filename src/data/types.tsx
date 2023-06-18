export type AllSchoolsLocations = {
  [key: string]: {
    id: string;
    school_id: string;
    location_id: string;
  };
};

export type DisciplineProps = {
  style: string;
  discipline?: string;
  city?: string;
  province?: string;
  citiesList?: string[];
  pageData?: FTDataProp[];
};

export type FTDataProp = {
  id: string;
  school_location_id: string;
  site: string;
  type: string;
  program: string;
  style: string;
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
