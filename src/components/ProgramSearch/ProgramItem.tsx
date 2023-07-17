import React from "react";
import { api } from "@component/utils/api";
import { ProgramWithType } from "./ProgramFilter";

export default function ProgramItem({ element }: { element: ProgramWithType }) {
  const { data: schoolLocationData } = api.schoolLocation.getAll.useQuery();
  const { data: schools } = api.school.getAll.useQuery();
  const { data: locations } = api.location.getAll.useQuery();

  const schoolLocObj = schoolLocationData?.find(
    (schoolLoc) => schoolLoc.id === element.schoolLocationId
  );
  const cityObj = locations?.find((loc) => loc.id === schoolLocObj?.locationId);
  const schoolObj = schools?.find(
    (school) => school.id === schoolLocObj?.schoolId
  );

  let disciplineText;

  switch (element.discipline) {
    case "dance":
      disciplineText = "Dancing";
      break;
    case "act":
      disciplineText = "Acting";
      break;
    case "sing":
      disciplineText = "Singing";
      break;
    case "mt":
      disciplineText = "Musical Theatre";
      break;
    default:
      disciplineText = "Performance";
  }

  return (
    <div className="m-10 flex flex-col items-center border-2 border-purple-200">
      <div className="text-sm italic">{element.id}</div>
      <div className="text-xl font-bold capitalize">
        {"name" in element && element.name && <div>{element.name}</div>}
      </div>
      <div className="text-lg font-bold capitalize">{schoolObj?.name}</div>
      <div className="text-md font-normal capitalize">
        {cityObj?.city}, {cityObj?.province}
      </div>

      <div className="italic">{element.website}</div>
      <div>
        {element.type === "ft" ? "Full Time " : "Part Time "} {disciplineText}{" "}
      </div>
    </div>
  );
}
