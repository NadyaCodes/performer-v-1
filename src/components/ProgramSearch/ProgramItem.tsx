import React from "react";
import { ProgramWithInfo } from "./ProgramFilter";

export default function ProgramItem({ element }: { element: ProgramWithInfo }) {
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
      <div className="text-lg font-bold capitalize">
        {element.schoolObj?.name}
      </div>
      <div className="text-md font-normal capitalize">
        {element.cityObj?.city}, {element.cityObj?.province}
      </div>

      <div className="italic">{element.website}</div>
      <div>
        {element.type === "ft" ? "Full Time " : "Part Time "} {disciplineText}{" "}
      </div>
    </div>
  );
}
