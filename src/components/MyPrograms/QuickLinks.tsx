import React, { useState } from "react";
import ScrollArrow from "../ProgramFinder/ScrollArrow";
import type { KeyValueListType } from "./MyProgramsComponent";

const QuickLinks = ({ keyValueList }: { keyValueList: KeyValueListType[] }) => {
  const [currentProgram, setCurrentProgram] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    const currentProgram = keyValueList.find((element) => element.id === id);
    currentProgram && setCurrentProgram(currentProgram?.id);
    setTimeout(() => {
      setCurrentProgram("");
    }, 1500);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const buttonDisplay = keyValueList.map((item) => {
    const itemKey = item.id;
    const divClass = `py-1 transition-all w-full  ${
      currentProgram === itemKey && item.type === "fav" ? "bg-cyan-50" : ""
    }
    ${currentProgram === itemKey && item.type !== "fav" ? "bg-indigo-200" : ""}
    ${hover === itemKey && item.type !== "fav" ? "bg-indigo-200" : ""}
    ${hover === itemKey && item.type === "fav" ? "bg-cyan-50" : ""}`;

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
          onClick={() => item.id && scrollToId(item.id)}
          key={itemKey}
        >
          <button
            key={item.id}
            className={`flex w-full justify-center break-all px-3 py-1 text-center capitalize ${
              item.type === "fav" ? "text-cyan-900" : "text-indigo-900"
            }`}
            onMouseEnter={() => setHover(itemKey)}
            onMouseLeave={() => setHover(null)}
          >
            {item.text}
          </button>
        </div>
      )
    );
  });

  return (
    <div
      className={`sticky top-52 z-10 -mt-60 hidden max-w-xs flex-col justify-start pl-8 transition-all mobileMenu:flex xl:max-w-sm`}
    >
      <div
        className="flex w-full flex-col place-self-start rounded-lg bg-indigo-100 opacity-0 shadow-lg shadow-indigo-900  "
        style={{ animation: "flyInFadeInLeft 1s ease-out 0.8s forwards" }}
      >
        <div className="hidden mobileMenu:block">
          <div className="w-full rounded-t-md bg-indigo-900 p-2 text-center text-lg font-bold text-indigo-50">
            Quick Links
          </div>
          <div className="flex h-52 min-h-full w-full flex-col overflow-y-scroll rounded">
            <div className="">{buttonDisplay}</div>
          </div>
        </div>
      </div>
      <div className="h-0 translate-y-7 ">
        <ScrollArrow />
      </div>
    </div>
  );
};

export default QuickLinks;
