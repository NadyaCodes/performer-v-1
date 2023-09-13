import React, { useState } from "react";
import Link from "next/link";
import SubscribeSignUp from "./SubscribeSignUp";
import { xMark } from "@component/data/svgs";

type LinkObject = {
  [key: string]: { name: string; link: string }[];
};

export default function FooterComponent() {
  const [showSubscribe, setShowSubscribe] = useState(false);

  const linkObject: LinkObject = {
    "Quick Links": [
      { name: "Home", link: "/" },
      { name: "About", link: "/about" },
      { name: "Blog", link: "/blog" },
      { name: "Patreon", link: "/patreon" },
      { name: "Merch", link: "/merch" },
    ],
    "Program Tools": [
      { name: "Program Finder", link: "/program-finder" },
      { name: "Program Directory", link: "/program-directory" },
      { name: "My Programs", link: "/my-programs" },
    ],
    Policies: [
      { name: "Terms and Conditions", link: "/terms" },
      { name: "Privacy Policy", link: "/privacy" },
    ],
  };

  const linkKeys = Object.keys(linkObject);

  const linkDisplay = linkKeys.map((item) => {
    const columnDisplay = linkObject[item]?.map((element) => {
      return (
        <Link
          href={element.link}
          key={element.name}
          className="hover:text-cyan-200"
        >
          {element.name}
        </Link>
      );
    });
    return (
      <div className="mx-4 mb-4 flex flex-grow flex-col text-sm">
        <div className="mb-2 w-fit border-b-2 border-cyan-700 px-3 text-base">
          {item}
        </div>
        {columnDisplay}
      </div>
    );
  });

  return (
    <div className="flex w-screen flex-col justify-around bg-cyan-900 py-5 text-cyan-50 md:flex-row">
      {showSubscribe && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className="w-fill flex max-h-screen flex-col items-center overflow-y-scroll rounded-lg bg-cyan-900">
            <button
              className="z-50 flex self-end rounded-bl-lg border border-cyan-500 bg-cyan-50 p-2 text-cyan-900 hover:scale-105 hover:text-cyan-200"
              onClick={() => setShowSubscribe(false)}
            >
              Close {xMark}
            </button>

            <div className="-my-7">
              <SubscribeSignUp />
            </div>
          </div>
        </div>
      )}
      <div className="my-3 flex w-full flex-wrap justify-around mobileMenu:w-10/12">
        {linkDisplay}

        <button
          onClick={() => setShowSubscribe(!showSubscribe)}
          className="m-5 h-16 rounded-full bg-indigo-600 px-2 py-2 shadow-md shadow-cyan-600 transition-all hover:scale-105"
        >
          Subscribe to Emails
        </button>
      </div>
    </div>
  );
}
