import React, { type Dispatch, type SetStateAction } from "react";
import { chevronUp } from "@component/data/svgs";
import { menuItems } from "./Menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function MobileMenuOpen({
  setViewMenu,
}: {
  setViewMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: sessionData } = useSession();

  const handleSignIn = async () => {
    if (!sessionData) {
      await signIn("google");
    }
  };

  const handleSignOut = async () => {
    signOut();
  };

  const menuDisplay = menuItems.map((item) => {
    let disabled = false;
    if (!sessionData?.user) {
      if (item.name === "My Programs") {
        disabled = true;
      }
    }
    return disabled ? (
      <div
        className="flex w-2/3 justify-center bg-cyan-900 bg-opacity-70 p-2 font-bold text-cyan-100"
        key={item.name}
      >
        {item.name}
      </div>
    ) : (
      <Link
        href={item.link}
        className="flex w-2/3 justify-center bg-cyan-100 p-2 font-bold shadow-md shadow-cyan-700 hover:scale-105 hover:bg-cyan-800 hover:text-cyan-50"
        onClick={() => setViewMenu(false)}
        key={item.name}
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
      {sessionData?.user && (
        <div className="flex flex-col items-center justify-center">
          <span>Signed in as:</span>
          <span>{sessionData.user.name}</span>
        </div>
      )}
      <button
        className="flex w-2/3 justify-center bg-indigo-100 p-2 font-bold shadow-md shadow-indigo-900 hover:scale-105 hover:bg-indigo-600 hover:bg-opacity-60 hover:text-indigo-50"
        onClick={sessionData ? handleSignOut : handleSignIn}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      <div
        onClick={() => setViewMenu(false)}
        className=" flex w-2/3 cursor-pointer justify-center bg-cyan-800  p-2 text-cyan-50 shadow-md shadow-cyan-700 hover:scale-105"
      >
        {chevronUp}
      </div>
    </div>
  );
}
