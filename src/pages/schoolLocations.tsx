import { NextPage } from "next";
import { api } from "@component/utils/api";
import { SchoolLocation, School, Location } from "@prisma/client";

const SchoolLocations: NextPage = () => {
  const { data: schoolLocationData } = api.schoolLocation.getAll.useQuery();
  const { data: schoolData } = api.school.getAll.useQuery();
  const { data: locationData } = api.location.getAll.useQuery();

  const SchoolLocationItem = ({ element }: { element: SchoolLocation }) => {
    const school = schoolData?.find((school) => school.id === element.schoolId);
    const location = locationData?.find(
      (location) => location.id === element.locationId
    );

    return (
      <div className="flex flex-col">
        <div>______________</div>
        <div className="w-10rem">
          {school
            ? `${school.name} (${element.schoolId})`
            : `${element.schoolId}`}
          ,{" "}
          {location
            ? `${location.city} (${element.locationId})`
            : `${element.locationId}`}
        </div>
        {element.website}

        <div>______________</div>
      </div>
    );
  };

  const schoolLocationDisplay = schoolLocationData?.map(
    (element: SchoolLocation) => {
      return <SchoolLocationItem key={element.id} element={element} />;
    }
  );
  return (
    <div>
      <div>{schoolLocationDisplay}</div>
    </div>
  );
};

export default SchoolLocations;
