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

  const buttonFilter = ["type", "discipline", "location"].map(
    (element, index) => {
      const [menu, setMenu] = useState(false);
      let currentSelection: string | LocationObject | undefined = "";
      if (
        selectedOptions &&
        typeof selectedOptions[element as keyof typeof selectedOptions] ===
          "string"
      ) {
        currentSelection =
          selectedOptions[element as keyof typeof selectedOptions];
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
        <div className="mx-4" key={element}>
          <button
            className="h-24 w-96 rounded-t-lg border border-cyan-700 bg-cyan-800 p-4 text-xl capitalize transition duration-300 hover:shadow-md hover:shadow-indigo-200"
            onClick={() => setMenu(!menu)}
            style={{ zIndex: 35 }}
          >
            <div className="flex items-center justify-around">
              {element}
              {currentSelection && ":"}

              {currentSelection && typeof currentSelection === "string" && (
                <span className="px-2 italic">{currentSelection}</span>
              )}
              {menu ? chevronUp : doubleChevronDown}
            </div>
          </button>
          {menu && element === "type" && (
            <Menu menuType="type" valueArray={["ft", "pt"]} setMenu={setMenu} />
          )}
          {menu && element === "discipline" && (
            <Menu
              menuType="discipline"
              valueArray={["act", "sing", "dance", "mt"]}
              setMenu={setMenu}
            />
          )}
          {menu && element === "location" && <LocationMenu setMenu={setMenu} />}
        </div>
      );
    }
  );

  return (
    <div
      className="relative bg-cyan-950 text-cyan-50"
      style={{
        boxShadow: "inset 0px -8px 16px rgba(0, 255, 255, 0.5)",
      }}
    >
      <div
        className="flex flex-col pt-16 text-center text-5xl font-extrabold"
        style={{ animation: "fadeInTranslate 1s linear forwards" }}
      >
        What Kind of Program Are You Looking For?
      </div>
      <div
        className="flex flex-col items-center p-5 opacity-0"
        style={{ animation: "fadeIn 1s linear .5s forwards" }}
      >
        <div className="mt-4 flex">{buttonFilter}</div>
        <div className="h-1 w-full rounded bg-indigo-400 opacity-50"></div>
        <Search />
      </div>
    </div>
  );
}
