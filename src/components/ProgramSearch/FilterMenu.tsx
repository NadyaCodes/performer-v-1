import React, { useState, useContext } from "react";
import TypeMenu from "./TypeMenu";
import DisciplineMenu from "./DisciplineMenu";
import LocationMenu from "./LocationMenu";
import Search from "./Search";
import { FilterContext } from "./ProgramFilter";
import { displayLocation } from "./helpers";

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

  const buttonFilter = options.map((element) => {
    const [menu, setMenu] = useState(false);
    let currentSelection;
    if (
      selectedOptions &&
      typeof selectedOptions[element.option as keyof typeof selectedOptions] ===
        "string"
    ) {
      currentSelection =
        selectedOptions[element.option as keyof typeof selectedOptions];
      if (currentSelection === "pt") {
        currentSelection = "Part Time";
      }
      if (currentSelection === "ft") {
        currentSelection = "Full Time";
      }
    } else if (selectedOptions) {
      currentSelection = displayLocation(selectedOptions.location);
    }

    return (
      <div className="m-2" key={element.option}>
        <button
          className="rounded border-2 border-blue-300 p-2 capitalize"
          onClick={() => setMenu(!menu)}
        >
          {element.option}

          {currentSelection && `: ${currentSelection}`}
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
