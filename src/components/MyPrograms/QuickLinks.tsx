import React, { useState } from "react";
import { ObjectList } from "@component/data/types";
import ScrollArrow from "../ProgramFinder/ScrollArrow";

const QuickLinks = ({ keyValueList }: { keyValueList: ObjectList[] }) => {
  const [currentProgram, setCurrentProgram] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (id === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setCurrentProgram(id);
  };

  const buttonDisplay = keyValueList.map((item, index) => {
    const itemKey = Object.keys(item)[0];
    const divClass = `py-1 transition-all w-full  ${
      currentProgram === itemKey && item.type === "fav" && "bg-cyan-50"
    }
    ${currentProgram === itemKey && item.type !== "fav" && "bg-indigo-200"}
    ${hover === itemKey && item.type !== "fav" && "bg-indigo-200"}
    ${hover === itemKey && item.type === "fav" && "bg-cyan-50"}`;

    return (
      itemKey && (
        <div
          className={divClass}
          style={{
            animation:
              currentProgram === itemKey
                ? "fadeBackground 1s linear 2s forwards"
                : "",
          }}
          onClick={() => scrollToElement(itemKey)}
        >
          <button
            key={index}
            className={`flex w-full justify-center break-all px-3 py-1 text-center capitalize ${
              item.type === "fav" ? "text-cyan-900" : "text-indigo-900"
            }`}
            onMouseEnter={() => setHover(itemKey)}
            onMouseLeave={() => setHover(null)}
          >
            {item[itemKey]}
          </button>
        </div>
      )
    );
  });

  return (
    <div
      className="sticky left-6 top-60 z-10 -mt-60 flex w-2/12 flex-col place-self-start rounded-lg bg-indigo-100 opacity-0 shadow-lg  shadow-indigo-900"
      style={{ animation: "flyInFadeInLeft 1s linear 1s forwards" }}
    >
      <div className="w-full rounded-t-md bg-indigo-900 p-2 text-center text-lg font-bold text-indigo-50">
        Quick Links
      </div>
      <div className=" flex h-52 min-h-full w-full flex-col overflow-y-scroll  rounded">
        <div className="">{buttonDisplay}</div>
      </div>
      <div className="h-0 translate-y-7">
        <ScrollArrow />
      </div>
    </div>
  );
};

export default QuickLinks;
