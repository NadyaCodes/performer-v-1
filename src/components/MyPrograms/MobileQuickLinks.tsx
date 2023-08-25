import React, { useState, useEffect } from "react";
import type { ObjectList } from "@component/data/types";
import SelectorScrollArrow from "../ProgramSelector/SelectorScrollArrow";
import type { KeyValueListType } from "./MyProgramsComponent";

const MobileQuickLinks = ({
  keyValueList,
  hideMenu,
}: {
  keyValueList: KeyValueListType[];
  hideMenu: boolean;
}) => {
  const [currentProgram, setCurrentProgram] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [showLinks, setShowLinks] = useState(false);
  const [stickyTop, setStickyTop] = useState(78);

  const scrollToId = (id: string) => {
    const elementObj = keyValueList.find((element) => element.id === id);
    elementObj?.componentRef?.current?.scrollIntoView({ behavior: "smooth" });
    elementObj && setCurrentProgram(elementObj?.id);
    setTimeout(() => {
      setCurrentProgram("");
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newTop = scrollY >= 100 ? -15 : 78;
      setStickyTop(newTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const buttonDisplay = keyValueList.map((item, index) => {
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
          onClick={() => scrollToId(itemKey)}
          key={itemKey}
        >
          <button
            key={index}
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
      className={`sticky left-6 z-10 -mt-60 flex w-full translate-y-2 justify-between p-3 transition-all md:px-16 mobileMenu:hidden ${
        hideMenu ? " opacity-0" : ""
      }`}
      style={{ top: `${stickyTop}px`, transition: "top 0.5s ease-in-out" }}
    >
      <div
        className="flex w-9/12 flex-col place-self-start rounded-lg bg-indigo-100 opacity-0 shadow-lg shadow-indigo-900"
        style={{ animation: "flyInFadeInLeft 1s linear 1s forwards" }}
      >
        <div className="h-0">
          <div
            className={` max-w-md ${
              showLinks ? "rounded-t-md" : "rounded-md"
            }  bg-indigo-900 p-2 text-center text-lg font-bold text-indigo-50`}
            onClick={() => setShowLinks(!showLinks)}
          >
            Quick Links
          </div>
          <div
            className={`flex h-52 min-h-full w-full max-w-md flex-col overflow-y-scroll rounded bg-indigo-100 shadow-lg shadow-indigo-900 ${
              showLinks ? "" : "hidden"
            }`}
            style={{ animation: "pullDownTop 0.3s linear" }}
          >
            <div className="">{buttonDisplay}</div>
          </div>
        </div>
      </div>
      <div className="-translate-y-2 scale-75">
        <SelectorScrollArrow />
      </div>
    </div>
  );
};

export default MobileQuickLinks;
