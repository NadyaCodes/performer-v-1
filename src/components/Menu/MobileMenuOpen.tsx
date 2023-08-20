import React, { Dispatch, SetStateAction } from "react";
import { chevronUp } from "@component/data/svgs";
import { menuItems } from "./Menu";
import Link from "next/link";

export default function MobileMenuOpen({
  setViewMenu,
}: {
  setViewMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const menuDisplay = menuItems.map((item) => {
    return (
      <Link
        href={item.link}
        className="flex w-2/3 justify-center bg-cyan-100 p-2 font-bold shadow-md shadow-cyan-700 hover:scale-105 hover:bg-cyan-800 hover:text-cyan-50"
        onClick={() => setViewMenu(false)}
      >
        {item.name}
      </Link>
    );
  });
  return (
    <div
      className=" absolute left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-between overflow-x-hidden overflow-y-hidden bg-cyan-50 py-20 text-cyan-900 transition-all"
      style={{ animation: "translateUpToDown 0.8s ease-in-out" }}
    >
      {menuDisplay}
      <div
        onClick={() => setViewMenu(false)}
        className=" flex w-2/3 cursor-pointer justify-center bg-cyan-800  p-2 text-cyan-50 shadow-md shadow-cyan-700 hover:scale-105"
      >
        {chevronUp}
      </div>
    </div>
  );
}
