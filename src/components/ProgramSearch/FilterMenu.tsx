import React, { useState, useContext } from "react";
import TypeMenu from "./TypeMenu";
import DisciplineMenu from "./DisciplineMenu";
import LocationMenu from "./LocationMenu";
import Search from "./Search";
import { FilterContext } from "./ProgramFilter";
import { LocationObject } from "./types";

export default function FilterMenu() {
  const filterContext = useContext(FilterContext);
  const selectedOptions = filterContext?.selectedOptions;
  const options = [
    { option: "type", menu: <TypeMenu /> },
    {
      option: "discipline",
      menu: <DisciplineMenu />,
    },
    { option: "location", menu: <LocationMenu /> },
  ];

  const displayLocation = (locationObject: LocationObject, element: string) => {
    let finalString = "";
    if (locationObject.city && locationObject.province) {
      finalString += `: ${locationObject.city}, ${locationObject.province}`;
    } else if (locationObject.province) {
      finalString += `: ${locationObject.province}`;
    } else if (locationObject.city) {
      finalString += `: ${locationObject.city}`;
    }

    return finalString;
  };

  const buttonFilter = options.map((element) => {
    const [menu, setMenu] = useState(false);
    return (
      <div className="m-2" key={element.option}>
        <button
          className="rounded border-2 border-blue-300 p-2 capitalize"
          onClick={() => setMenu(!menu)}
        >
          {element.option}

          {selectedOptions &&
            (selectedOptions[element.option as keyof typeof selectedOptions] &&
            element.option !== "location"
              ? `: ${
                  selectedOptions[
                    element.option as keyof typeof selectedOptions
                  ]
                }`
              : displayLocation(selectedOptions.location, element.option))}
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
    <div className="flex">
      {buttonFilter}
      <Search />
    </div>
  );
}
