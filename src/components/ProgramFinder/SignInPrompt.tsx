import React from "react";
import { xMark } from "@component/data/svgs";
import { signIn } from "next-auth/react";

export default function SignInPrompt({
  setStarPopUp,
}: {
  setStarPopUp: React.Dispatch<React.SetStateAction<string>> | undefined;
}) {
  const handleCloseStarPopUp = () => {
    setStarPopUp && setStarPopUp("");
  };

  const handleSignIn = async () => {
    signIn("google").catch((error) =>
      console.error("Error signing in: ", error)
    );
  };

  return (
    <div className="relative h-0 rounded-sm">
      <div
        className="flex items-center justify-between rounded-sm bg-cyan-700 p-2 text-cyan-50"
        style={{ animation: "pullDownTop 0.2s linear" }}
      >
        <div className="pl-3">
          <button
            className="mr-2 font-semibold italic text-indigo-100 hover:cursor-pointer hover:text-indigo-300"
            onClick={handleSignIn}
          >
            Sign in with Google
          </button>
          to save program to your faves list
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
