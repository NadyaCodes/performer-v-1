import { useState } from "react";
import { NextPage } from "next";
import { api } from "@component/utils/api";
import { FTProgram, PTProgram, School } from "@prisma/client";

const programFilter: NextPage = () => {
  const { data: ftProgramData } = api.ftProgram.getAll.useQuery();
  const { data: ptProgramData } = api.ptProgram.getAll.useQuery();
  const { data: schoolLocationData } = api.schoolLocation.getAll.useQuery();
  const { data: schools } = api.school.getAll.useQuery();
  const { data: locations } = api.location.getAll.useQuery();

  const [displayFilter, setDisplayFilter] = useState({
    type: "",
    discipline: "",
    location: "",
  });

  const ProgramItem = ({
    element,
    type,
  }: {
    element: FTProgram | PTProgram;
    type: String;
  }) => {
    const schoolLocObj = schoolLocationData?.find(
      (schoolLoc) => schoolLoc.id === element.schoolLocationId
    );
    const cityObj = locations?.find(
      (loc) => loc.id === schoolLocObj?.locationId
    );
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
          {type === "ft" ? "Full Time " : "Part Time "} {disciplineText}{" "}
        </div>
      </div>
    );
  };

  const ftProgramDisplay = ftProgramData?.map((element) => {
    return <ProgramItem key={element.id} element={element} type="ft" />;
  });
  const ptProgramDisplay = ptProgramData?.map((element) => {
    return <ProgramItem key={element.id} element={element} type="pt" />;
  });

  const updateFilter = (element: string, value: string) => {
    setDisplayFilter({ ...displayFilter, [element]: value });
  };
  const typeMenu = (
    <div className="flex flex-col">
      <button
        className="m-1 rounded border-2 border-green-300 p-2 capitalize"
        onClick={() => updateFilter("type", "pt")}
      >
        Part Time
      </button>
      <button
        className="m-1 rounded border-2 border-green-300 p-2 capitalize"
        onClick={() => updateFilter("type", "ft")}
      >
        Full Time
      </button>
      <button
        className="m-1 rounded border-2 border-red-600 p-2 capitalize"
        onClick={() => updateFilter("type", "")}
      >
        RESET
      </button>
    </div>
  );
  const disciplineMenu = <div>Discipline Menu</div>;
  const locationMenu = <div>Location Menu</div>;

  const options = [
    { option: "type", menu: typeMenu },
    { option: "discipline", menu: disciplineMenu },
    { option: "location", menu: locationMenu },
  ];

  const buttonFilter = options.map((element) => {
    const [menu, setMenu] = useState(false);
    return (
      <div className="m-2">
        <button
          className="rounded border-2 border-blue-300 p-2 capitalize"
          onClick={() => setMenu(!menu)}
        >
          {element.option}
        </button>
        {menu && (
          <div>
            <div>Pick Your {element.option.toUpperCase()}</div>
            <div>{element.menu}</div>
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <div className="flex">{buttonFilter}</div>
      <div>
        {displayFilter.type} {displayFilter.discipline} {displayFilter.location}
      </div>
      <div className="h2">Here are your programs:</div>
      <div className="mx-40">
        {displayFilter.type === "pt" ? null : ftProgramDisplay}
        {displayFilter.type === "ft" ? null : ptProgramDisplay}
      </div>
    </div>
  );
};

export default programFilter;
