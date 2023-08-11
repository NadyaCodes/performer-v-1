import React, { useState, useEffect } from "react";
import { ObjectList } from "@component/data/types";

const QuickLinks = ({ keyValueList }: { keyValueList: ObjectList[] }) => {
  const [currentProgram, setCurrentProgram] = useState<string | null>(null);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setCurrentProgram(id);
  };

  const buttonDisplay = keyValueList.map((item, index) => {
    const itemKey = Object.keys(item)[0];

    return (
      itemKey && (
        <div
          className={currentProgram === itemKey ? "bg-cyan-500" : ""}
          style={{
            animation:
              currentProgram === itemKey
                ? "fadeBackground 1s linear 2s forwards"
                : "",
          }}
        >
          <button
            key={index}
            onClick={() => scrollToElement(itemKey)}
            className="flex flex-col p-2 text-left capitalize"
          >
            {item[itemKey]}
          </button>
        </div>
      )
    );
  });

  return (
    <div className="sticky  left-6 top-32 flex h-0 w-2/12 max-w-6xl flex-col place-self-start">
      {buttonDisplay}
    </div>
  );
};

export default QuickLinks;
