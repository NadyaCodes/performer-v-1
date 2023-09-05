import React from "react";
import { xMark } from "@component/data/svgs";

export default function SignInPrompt({
  setStarPopUp,
}: {
  setStarPopUp: React.Dispatch<React.SetStateAction<string>> | undefined;
}) {
  const handleCloseStarPopUp = () => {
    setStarPopUp && setStarPopUp("");
  };
  return (
    <div className="relative h-0 rounded-sm">
      <div
        className="flex items-center justify-between rounded-sm bg-cyan-700 p-2 text-cyan-50"
        style={{ animation: "pullDownTop 0.2s linear" }}
      >
        <div className="pl-3">
          Sign in with Google to save program to your faves list
        </div>
        <button
          onClick={handleCloseStarPopUp}
          className="m-2 rounded border-2 p-1 hover:scale-105 hover:shadow-lg hover:shadow-cyan-950"
        >
          {xMark}
        </button>
      </div>
    </div>
  );
}
