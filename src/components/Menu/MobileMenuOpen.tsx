import React, { type Dispatch, type SetStateAction, useState } from "react";
import { chevronUp, xMark } from "@component/data/svgs";
import { menuItems } from "./Menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  MobileDirectoryTipComponent,
  MobileFinderTipComponent,
  MobileProgramsTipComponent,
} from "./MenuToolTips";

export default function MobileMenuOpen({
  setViewMenu,
}: {
  setViewMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: sessionData } = useSession();
  const [toolTipItem, setTooltipItem] = useState<string | undefined>("");

  const handleSignIn = async () => {
    if (!sessionData) {
      await signIn("google");
    }
  };

  const handleSignOut = () => {
    void signOut();
  };

  const menuDisplay = menuItems.map((item) => {
    let disabled = false;
    if (!sessionData?.user) {
      if (item.name === "My Programs") {
        disabled = true;
      }
    }
    return disabled ? (
      <div className="flex w-2/3 flex-col" key={item.name}>
        {item.toolTipItem && (
          <div className="place-self-end">
            <button
              className="absolute translate-x-7 translate-y-2 rounded-full border-2 border-cyan-600 px-2 text-cyan-700"
              onClick={() =>
                item.toolTipItem === toolTipItem
                  ? setTooltipItem("")
                  : setTooltipItem(item.toolTipItem)
              }
            >
              ?
            </button>
          </div>
        )}
        {toolTipItem === item.toolTipItem && toolTipItem === "programsTip" && (
          <div
            className="absolute z-10 flex w-2/3 flex-col rounded-md rounded-t-none bg-cyan-900 text-cyan-50"
            style={{
              animation: "pullDownTop 0.3s forwards",
            }}
          >
            <div
              onClick={() => setTooltipItem("")}
              className="place-self-end p-3"
            >
              {xMark}
            </div>
            {MobileProgramsTipComponent}
          </div>
        )}
        <div className="flex justify-center bg-cyan-900 bg-opacity-70  p-2 font-bold text-cyan-100 shadow-md shadow-cyan-700 hover:scale-105 hover:bg-cyan-800 hover:text-cyan-50">
          {item.name}
        </div>
      </div>
    ) : (
      <div className="flex w-2/3 flex-col" key={item.name}>
        {item.toolTipItem && (
          <div className="place-self-end">
            <button
              className="absolute translate-x-7 translate-y-2 rounded-full border-2 border-cyan-600 px-2 text-cyan-700"
              onClick={() =>
                item.toolTipItem === toolTipItem
                  ? setTooltipItem("")
                  : setTooltipItem(item.toolTipItem)
              }
            >
              ?
            </button>
          </div>
        )}
        {toolTipItem === item.toolTipItem && toolTipItem === "finderTip" && (
          <div
            className=" absolute z-10 flex w-2/3 flex-col rounded-md rounded-t-none bg-cyan-900 text-cyan-50"
            style={{
              animation: "pullDownTop 0.3s forwards",
            }}
          >
            <div
              onClick={() => setTooltipItem("")}
              className="place-self-end p-3"
            >
              {xMark}
            </div>
            {MobileFinderTipComponent}
          </div>
        )}
        {toolTipItem === item.toolTipItem && toolTipItem === "directoryTip" && (
          <div
            className="absolute z-10 flex w-2/3 flex-col rounded-md rounded-t-none bg-cyan-900 text-cyan-50"
            style={{
              animation: "pullDownTop 0.3s forwards",
            }}
          >
            <div
              onClick={() => setTooltipItem("")}
              className="place-self-end p-3"
            >
              {xMark}
            </div>
            {MobileDirectoryTipComponent}
          </div>
        )}

        {toolTipItem === item.toolTipItem && toolTipItem === "programsTip" && (
          <div
            className="absolute z-10 flex w-2/3 flex-col rounded-md rounded-t-none bg-cyan-900 text-cyan-50"
            style={{
              animation: "pullDownTop 0.3s forwards",
            }}
          >
            <div
              onClick={() => setTooltipItem("")}
              className="place-self-end p-3"
            >
              {xMark}
            </div>
            {MobileProgramsTipComponent}
          </div>
        )}

        <Link
          href={item.link}
          className="flex justify-center bg-cyan-100 p-2 font-bold shadow-md shadow-cyan-700 hover:scale-105 hover:bg-cyan-800 hover:text-cyan-50"
          onClick={() => setViewMenu(false)}
        >
          {item.name}
        </Link>
      </div>
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
