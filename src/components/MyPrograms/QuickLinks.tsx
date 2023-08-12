import React, { useState, useEffect } from "react";
import { ObjectList } from "@component/data/types";

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

    return (
      itemKey && (
        <div className="my-1">
          <div
            className={
              currentProgram === itemKey || hover === itemKey
                ? "bg-cyan-500"
                : ""
            }
            style={{
              animation:
                currentProgram === itemKey
                  ? "fadeBackground 1s linear 2s forwards"
                  : "",
            }}
            onMouseOver={() => setHover(itemKey)}
            onMouseOut={() => setHover(itemKey)}
            onClick={() => scrollToElement(itemKey)}
          >
            <button
              key={index}
              className="flex flex-col p-2 text-left capitalize"
            >
              {item[itemKey]}
            </button>
          </div>
        </div>
      )
    );
  });

  return (
    <div className=" sticky left-6 top-40 z-50 -mt-44 flex h-52 w-2/12 max-w-6xl flex-col place-self-start overflow-y-scroll rounded shadow-xl shadow-indigo-300">
      {buttonDisplay}
    </div>
  );
};

export default QuickLinks;
