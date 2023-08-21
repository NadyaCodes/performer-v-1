import React, { SetStateAction, Dispatch } from "react";
import { bars2 } from "@component/data/svgs";

export default function MenuBubble({
  dark,
  viewMenu,
  setViewMenu,
}: {
  dark: boolean;
  viewMenu: boolean;
  setViewMenu: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`mx-4 mt-1 flex cursor-pointer items-center justify-center rounded-full border-2 transition-all hover:scale-125 md:mx-8 md:mt-5 md:scale-125 hover:md:scale-150 ${
        dark
          ? "border-cyan-200 p-2 text-cyan-200"
          : "border-cyan-900 p-2 text-cyan-800"
      } `}
      onClick={() => setViewMenu(!viewMenu)}
    >
      {bars2}
    </div>
  );
}
