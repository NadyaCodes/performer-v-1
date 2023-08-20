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
      className={`mx-3 mt-4 flex items-center justify-center rounded-full border-2 ${
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
