import React, { useState, useContext } from "react";
import LocationMenu from "./LocationMenu";
import Search from "./Search";
import { FilterContext } from "./ProgramFinderComponent";
import { displayLocation } from "./helpers";
import Menu from "./Menu";
import { chevronUp, doubleChevronDown } from "@component/data/svgs";
import { disciplinesFull } from "@component/data/constants";
import type { LocationObject } from "./types";
import { useSession } from "next-auth/react";

export default function FilterMenu() {
  const filterContext = useContext(FilterContext);
  const selectedOptions = filterContext?.selectedOptions;
  const [menu, setMenu] = useState<string | false>(false);
  const { data: sessionData } = useSession();

  const buttonFilter = ["type", "discipline", "location"].map((element) => {
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
      <div
        className="mx-4 my-2 md:mx-2 md:mb-0 lg:my-0 2xl:mx-16 2xl:mt-10"
        key={element}
      >
        <div className="flex flex-col items-center">
          <button
            className="h-28 w-64 rounded-t-lg border border-cyan-700 bg-cyan-800 p-1 text-xl capitalize transition duration-300 hover:shadow-md hover:shadow-indigo-200 md:h-32 md:w-52 lg:w-64 xl:hidden"
            onClick={() =>
              menu === element ? setMenu(false) : setMenu(element)
            }
            style={{ zIndex: 35 }}
          >
            <div className="flex items-center justify-around">
              {currentSelection ? (
                <div className="flex w-full flex-col">
                  <span className="flex w-full justify-around pb-2">
                    <span>{element}:</span>
                    <span>{menu ? chevronUp : doubleChevronDown}</span>
                  </span>
                  <span className="px-2 italic">
                    {typeof currentSelection === "string" && currentSelection}
                  </span>
                </div>
              ) : (
                <div className="flex w-full justify-around">
                  {element}
                  {menu ? chevronUp : doubleChevronDown}
                </div>
              )}
            </div>
          </button>
          <button
            className="hidden h-24 w-96 rounded-t-lg border border-cyan-700 bg-cyan-800 p-4 text-xl capitalize transition duration-300 hover:shadow-md hover:shadow-indigo-200 xl:block "
            onClick={() =>
              menu === element ? setMenu(false) : setMenu(element)
            }
            style={{ zIndex: 35 }}
          >
            <div className="flex items-center justify-around">
              {element}
              {currentSelection && ":"}

              {currentSelection && typeof currentSelection === "string" && (
                <span className="px-2 italic">{currentSelection}</span>
              )}
              {menu === element ? chevronUp : doubleChevronDown}
            </div>
          </button>
          <div className="h-1 w-72 rounded bg-indigo-400 opacity-50 md:hidden md:w-56"></div>
        </div>
        <div className="m-auto w-64  md:w-52 lg:w-64 xl:w-96">
          {menu === "type" && element === "type" && (
            <Menu menuType="type" valueArray={["ft", "pt"]} setMenu={setMenu} />
          )}
          {menu === "discipline" && element === "discipline" && (
            <Menu
              menuType="discipline"
              valueArray={["act", "sing", "dance", "mt"]}
              setMenu={setMenu}
            />
          )}
          {menu === "location" && element === "location" && (
            <LocationMenu setMenu={setMenu} />
          )}
        </div>
      </div>
    );
  });

  return (
    <div
      className={`${
        sessionData?.user ? "-mt-28" : "-mt-16"
      } bg-cyan-950 pt-10 text-cyan-50 lg:mt-0`}
      style={{
        boxShadow: "inset 0px -8px 16px rgba(0, 255, 255, 0.5)",
      }}
    >
      <div
        className="flex flex-col overflow-x-hidden px-6 pt-24 text-center text-4xl font-extrabold md:px-20 lg:pt-16 lg:text-5xl"
        style={{ animation: "fadeInTranslate 1s linear forwards" }}
      >
        What Kind of Program Are You Looking For?
      </div>
      <div
        className="flex flex-col items-center p-5 opacity-0"
        style={{ animation: "fadeIn 1s linear .5s forwards" }}
      >
        <div className="mt-4 flex flex-col md:flex-row">{buttonFilter}</div>
        <div className="hidden h-1 w-full rounded bg-indigo-400 opacity-50 md:block"></div>
        <Search menu={menu} />
      </div>
    </div>
  );
}
