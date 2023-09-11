import React, { useState } from "react";
import AuthShowcase from "./AuthShowcase";
import Link from "next/link";
import Logo from "./Logo";
import { menuItems } from "./Menu";
import {
  FinderTipComponent,
  DirectoryTipComponent,
  ProgramsTipComponent,
  PatreonTipComponent,
} from "./MenuToolTips";

export default function FullMenu() {
  const [toolTip, setToolTip] = useState<string>("");

  const menuDisplay = menuItems.map((item) => {
    const nameArray = item.name.split(" ");
    const displayName = nameArray.map((word) => {
      return (
        <span className="mx-1" key={word}>
          {word}
        </span>
      );
    });
    return (
      <div key={item.name} className="px-2">
        <Link
          href={item.link}
          className="group flex rounded-t-md border-b-2 border-transparent bg-transparent transition-all hover:border-cyan-700"
          onMouseEnter={() => item.toolTipItem && setToolTip(item.toolTipItem)}
          onMouseLeave={() => setToolTip("")}
        >
          <button className="flex flex-col items-center xl:flex-row">
            {displayName}
          </button>{" "}
        </Link>
        {toolTip === "finderTip" &&
          item.name === "Program Finder" &&
          FinderTipComponent}
        {toolTip === "directoryTip" &&
          item.name === "Program Directory" &&
          DirectoryTipComponent}
        {toolTip === "programsTip" &&
          item.name === "My Programs" &&
          ProgramsTipComponent}
        {toolTip === "patreonTip" &&
          item.name === "Patreon" &&
          PatreonTipComponent}
      </div>
    );
  });

  return (
    <div
      className="relative z-40 flex w-full flex-col items-center bg-cyan-50 px-5 text-cyan-900"
      style={{
        boxShadow: `0px 1px 2px rgba(0,255,255,0.5), 0px 2px 4px rgba(0,255,255,0.5), 0px 4px 8px rgba(0,255,255,0.5), 0px 8px 16px rgba(0,255,255,0.5)`,
      }}
    >
      <div className="flex w-full items-center">
        <Logo color="black" />
        <div className="flex w-full flex-col 2xl:text-lg 3xl:text-2xl">
          <div className="flex w-full items-center justify-between ">
            <div className="ml-2 flex w-10/12 items-center justify-around xl:ml-5">
              {menuDisplay}
            </div>
            <div className="">
              <AuthShowcase />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
