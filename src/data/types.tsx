export type DisciplineProps = {
  style: string;
  discipline?: string;
  city?: string;
  province: string;
  citiesList?: string[];
};

export type PathsArray = {
  params: DisciplineProps;
};

export type ObjectList = { [key: string]: string };
