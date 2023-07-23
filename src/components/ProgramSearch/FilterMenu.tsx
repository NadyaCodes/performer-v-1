import React, { useState, useContext } from "react";
import LocationMenu from "./LocationMenu";
import Search from "./Search";
import { FilterContext } from "./ProgramSearchComponent";
import { displayLocation } from "./helpers";
import Menu from "./Menu";

export default function FilterMenu() {
  const filterContext = useContext(FilterContext);
  const selectedOptions = filterContext?.selectedOptions;
  const options = [
    {
      option: "type",
      menu: <Menu menuType="type" valueArray={["ft", "pt"]} />,
    },
    {
      option: "discipline",
      menu: (
        <Menu
          menuType="discipline"
          valueArray={["act", "sing", "dance", "mt"]}
        />
      ),
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
          className="w-96 rounded border-2 border-blue-300 p-2 capitalize"
          onClick={() => setMenu(!menu)}
        >
          {element.option}

          {currentSelection && `: ${currentSelection}`}
        </button>
        {menu && <div className="w-96">{element.menu}</div>}
      </div>
    );
  });
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">{buttonFilter}</div>
      <Search />
    </div>
  );
}
