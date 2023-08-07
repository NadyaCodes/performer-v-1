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

  const buttonFilter = options.map((element, index) => {
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
      <div className="mx-4" key={element.option}>
        <button
          className="h-24 w-96 rounded-t-lg border border-cyan-700 bg-cyan-800 p-4 text-xl capitalize transition duration-300 hover:shadow-md hover:shadow-indigo-200"
          onClick={() => setMenu(!menu)}
          style={{ zIndex: 35 }}
        >
          <div className="flex items-center justify-around">
            {element.option}
            {currentSelection && ":"}

            {currentSelection && typeof currentSelection === "string" && (
              <span className="px-2 italic">{currentSelection}</span>
            )}
            {menu ? chevronUp : doubleChevronDown}
          </div>
        </button>
        {menu && <div className="absolute w-96">{element.menu}</div>}
      </div>
    );
  });

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

  // return (
  //   <div className="relative z-30 bg-cyan-950 text-cyan-50">
  //     <div
  //       className="flex flex-col pt-16 text-center text-5xl font-extrabold"
  //       style={{ animation: "fadeInTranslate 1s linear forwards" }}
  //     >
  //       What Kind of Program Are You Looking For?
  //     </div>
  //     <div
  //       className="flex flex-col items-center p-5 opacity-0"
  //       style={{ animation: "fadeIn 1s linear .5s forwards", zIndex: 35 }}
  //     >
  //       <div className="z-35 mt-4 flex">{buttonFilter}</div>
  //       <div className="h-1 w-full rounded bg-indigo-400 opacity-50"></div>
  //       <Search />
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="relative z-30 bg-cyan-950 text-cyan-50">
  //     <div
  //       className="flex flex-col pt-16 text-center text-5xl font-extrabold"
  //       style={{ animation: "fadeInTranslate 1s linear forwards" }}
  //     >
  //       What Kind of Program Are You Looking For?
  //     </div>
  //     <div
  //       className="flex flex-col items-center p-5 opacity-0"
  //       style={{ animation: "fadeIn 1s linear .5s forwards", zIndex: 35 }}
  //     >
  //       <div className="z-35 mt-4 flex">{buttonFilter}</div>
  //       <div className="h-1 w-full rounded bg-indigo-400 opacity-50"></div>
  //       <Search />
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="bg-cyan-950 text-cyan-50">
  //     <div
  //       className="flex flex-col pt-16 text-center text-5xl font-extrabold"
  //       style={{ animation: "fadeInTranslate 1s linear forwards" }}
  //     >
  //       What Kind of Program Are You Looking For?
  //     </div>
  //     <div
  //       className="z-35 relative flex flex-col items-center p-5 opacity-0"
  //       style={{ animation: "fadeIn 1s linear .5s forwards" }}
  //     >
  //       <div className="mt-4 flex">{buttonFilter}</div>
  //       <div className="h-1 w-full rounded bg-indigo-400 opacity-50"></div>
  //     </div>
  //     <Search />
  //   </div>
  // );
}
