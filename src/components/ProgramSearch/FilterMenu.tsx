import React, { useState, useContext } from "react";
import LocationMenu from "./LocationMenu";
import Search from "./Search";
import { FilterContext } from "./CourseFinderComponent";
import { displayLocation } from "./helpers";
import Menu from "./Menu";
import { chevronUp, doubleChevronDown } from "@component/data/svgs";
import { disciplinesFull } from "@component/data/constants";
import { LocationObject } from "./types";

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
    let currentSelection: string | LocationObject | undefined = "";
    if (
      selectedOptions &&
      typeof selectedOptions[element.option as keyof typeof selectedOptions] ===
        "string"
    ) {
      currentSelection =
        selectedOptions[element.option as keyof typeof selectedOptions];
      if (typeof currentSelection === "string") {
        Object.keys(disciplinesFull).forEach((key) => {
          if (currentSelection && currentSelection === key) {
            currentSelection = disciplinesFull[key];
          }
        });
        if (currentSelection === "pt") {
          currentSelection = "Part Time";
        }
        if (currentSelection === "ft") {
          currentSelection = "Full Time";
        }
      }
    } else if (selectedOptions) {
      currentSelection = displayLocation(selectedOptions.location);
    }

    return (
      <div className="m-4 h-16" key={element.option}>
        <button
          className="h-24 w-96 rounded-t-lg border border-cyan-700 bg-cyan-800 p-4 text-xl capitalize transition duration-300 hover:shadow-lg"
          onClick={() => setMenu(!menu)}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            const element = e.target as HTMLButtonElement;
            if (element.type === "submit") {
              element.style.boxShadow =
                "inset 0px -3px 6px rgba(0,255,255,0.5)";
            }
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            const element = e.target as HTMLButtonElement;
            if (element.type === "submit") {
              element.style.boxShadow = "";
            }
          }}
        >
          <div className="flex items-center justify-around">
            {element.option}
            {currentSelection && ": "}

            {currentSelection && typeof currentSelection === "string" && (
              <span className="italic">{currentSelection}</span>
            )}
            {menu ? chevronUp : doubleChevronDown}
          </div>
        </button>
        {menu && <div className="w-96">{element.menu}</div>}
      </div>
    );
  });
  return (
    <div className="relative bg-cyan-950 text-cyan-50">
      <div className="flex flex-col items-center p-5">
        <div className="z-30 mb-4 flex">{buttonFilter}</div>
        <Search />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-60"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5), inset 0px -8px 16px rgba(0,255,255,0.5)",
        }}
      ></div>
    </div>
  );
}
