import React, { SetStateAction, Dispatch } from "react";
import { shareIcon } from "@component/data/svgs";

export default function ShareIcon({
  share,
  setShare,
}: {
  share: boolean;
  setShare: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="mr-5 h-0 -translate-y-12 place-self-end">
      <div
        className="text-cyan-700 hover:scale-150 hover:cursor-pointer"
        onClick={() => setShare(!share)}
      >
        {shareIcon}
      </div>
    </div>
  );
}
