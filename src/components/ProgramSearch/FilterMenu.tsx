import React, { useState, useContext } from "react";
import LocationMenu from "./LocationMenu";
import Search from "./Search";
import { FilterContext } from "./CourseFinderComponent";
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
          className="h-16 w-96 rounded border border-cyan-700 bg-cyan-800 p-2 text-xl capitalize transition duration-300 hover:scale-105 hover:shadow-lg"
          onClick={() => setMenu(!menu)}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            const element = e.target as HTMLButtonElement;
            element.style.boxShadow = "inset 0px -3px 6px rgba(0,255,255,0.5)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            const element = e.target as HTMLButtonElement;
            element.style.boxShadow = "";
          }}
        >
          {element.option}

          {currentSelection && `: ${currentSelection}`}
        </button>
        {menu && <div className="w-96">{element.menu}</div>}
      </div>
    );
  });
  return (
    <div className="relative bg-cyan-950 text-cyan-50">
      <div className="z-10 flex flex-col items-center p-5">
        <div className="z-20 flex">{buttonFilter}</div>
        <Search />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-44"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5), inset 0px -8px 16px rgba(0,255,255,0.5)",
        }}
      ></div>
    </div>
  );
}
