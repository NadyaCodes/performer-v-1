import React, { useState } from "react";
import AuthShowcase from "./AuthShowcase";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Logo from "./Logo";

export default function Menu() {
  const { data: sessionData } = useSession();
  const [toolTip, setToolTip] = useState<string>("");

  const programsLinkClass = sessionData
    ? "my-2 flex rounded-t-md border-b-2 border-transparent bg-transparent py-2 font-semibold transition-all hover:border-cyan-700 "
    : "my-2 flex rounded-t-md border-b-2 border-transparent text-cyan-500 py-2 font-semibold transition-all ";

  return (
    <div
      className="flex w-full flex-col items-center space-y-10 border-b-2 bg-cyan-50 p-3 text-cyan-900"
      style={{
        boxShadow: `0px 1px 2px rgba(0,255,255,0.5), 0px 2px 4px rgba(0,255,255,0.5), 0px 4px 8px rgba(0,255,255,0.5), 0px 8px 16px rgba(0,255,255,0.5)`,
      }}
    >
      <div className="flex w-11/12 items-center justify-between">
        <div className="flex w-7/12 items-center justify-between">
          <Logo color="black" />
          <Link
            href={"/"}
            className="group my-2 flex rounded-t-md border-b-2 border-transparent bg-transparent py-4 font-semibold transition-all hover:border-cyan-700"
          >
            <button className="">Home</button>
          </Link>
          <div className="">
            <Link
              href={"/program-search"}
              className="group my-2 flex rounded-t-md border-b-2 border-transparent bg-transparent py-4 font-semibold transition-all hover:border-cyan-700"
              onMouseEnter={() => setToolTip("finderTip")}
              onMouseLeave={() => setToolTip("")}
            >
              <button className="">Course Finder</button>
            </Link>
            {toolTip === "finderTip" && (
              <div className="flex justify-center">
                <div
                  id="tooltip-bottom"
                  role="tooltip"
                  className="tooltip absolute z-10 inline-block max-w-xs rounded-lg bg-gradient-to-b from-[#edfeff] to-[#6db6b9] px-3 py-7 text-center text-base font-medium text-cyan-950 shadow-sm dark:bg-gray-700"
                  style={{
                    animation: "pullDownTop 0.3s forwards",
                  }}
                >
                  Find schools by selecting filters and searching for the things
                  you want!
                </div>
              </div>
            )}
          </div>
          <div className="">
            <Link
              href={sessionData ? "/course-selector" : "#"}
              className="my-2 flex rounded-t-md border-b-2 border-transparent bg-transparent py-4 font-semibold transition-all hover:border-cyan-700 "
              onMouseEnter={() => setToolTip("selectorTip")}
              onMouseLeave={() => setToolTip("")}
            >
              <button className="">Course Selector</button>
            </Link>
            {toolTip === "selectorTip" && (
              <div className="flex justify-center">
                <div
                  id="tooltip-bottom"
                  role="tooltip"
                  className="absolute z-10 inline-block max-w-xs rounded-lg bg-gradient-to-b from-[#edfeff] to-[#6db6b9] px-3 py-7 text-center text-base font-medium text-cyan-950 shadow-sm dark:bg-gray-700"
                  style={{
                    animation: "pullDownTop 0.3s ease-in-out forwards",
                  }}
                >
                  Find schools by following a rabbit hole of links.
                </div>
              </div>
            )}
          </div>
          <div>
            <Link
              href={sessionData ? "/my-programs" : "#"}
              className={programsLinkClass}
              onMouseEnter={() => setToolTip("programsTip")}
              onMouseLeave={() => setToolTip("")}
            >
              <button className="">My Programs</button>
            </Link>
            {toolTip === "programsTip" && (
              <div className="flex justify-center">
                <div
                  id="tooltip-bottom"
                  role="tooltip"
                  className="absolute z-10 inline-block max-w-xs rounded-lg bg-gradient-to-b from-[#edfeff] to-[#6db6b9] px-3 py-7 text-center text-base font-medium text-cyan-950 shadow-sm dark:bg-gray-700"
                  style={{
                    animation: "pullDownTop 0.3s ease-in-out forwards",
                  }}
                >
                  Your personal list of saved programs (Account Required)
                </div>
              </div>
            )}
          </div>
          <Link
            href={"/contact"}
            className="my-2 flex rounded-t-md border-b-2 border-transparent bg-transparent py-2 font-semibold transition-all hover:border-cyan-700 "
          >
            <button className="">Contact</button>
          </Link>
        </div>
        <div className="justify-self-end">
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
}
