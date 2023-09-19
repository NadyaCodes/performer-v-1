import React, { useState } from "react";
import Link from "next/link";
import SubscribeSignUp from "./SubscribeSignUp";
import { xMark } from "@component/data/svgs";
import Image from "next/image";

type LinkObject = {
  [key: string]: { name: string; link: string }[];
};

export default function FooterComponent({ bgColor }: { bgColor: string }) {
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
    let columnDisplay: React.ReactNode | undefined = undefined;
    const linkDisplay = linkObject[item]?.map((element) => (
      <Link
        href={element.link}
        key={element.name}
        className="mb-0.5 hover:text-cyan-200"
      >
        {element.name}
      </Link>
    ));

    if (item !== "Quick Links") {
      columnDisplay = linkDisplay;
    } else {
      const midpoint = 3;
      const column1 = linkDisplay?.slice(0, midpoint);
      const column2 = linkDisplay?.slice(midpoint);

      columnDisplay = (
        <div className="flex">
          <div className="flex w-1/2 flex-col">{column1}</div>
          <div className="flex w-1/2 flex-col">{column2}</div>
        </div>
      );
    }

    return (
      <div className="mr-2 flex flex-grow justify-center" key={item}>
        <div className="mx-auto mb-6 flex flex-col p-2 text-sm 2xl:text-base">
          <div className="mb-2 w-fit border-b-2 border-cyan-700 pr-4 text-base xxs:pr-10 2xl:text-lg">
            {item}
          </div>
          {columnDisplay}
        </div>
      </div>
    );
  });

  return (
    <div
      className={`flex w-screen flex-col justify-around border-t-4 border-cyan-900 bg-cyan-900 text-cyan-50 ${bgColor}`}
    >
      <div className="flex flex-col justify-around md:flex-row ">
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
        <div className="my-3 flex w-full flex-wrap content-center justify-between px-3 md:w-11/12 2xl:w-10/12">
          {linkDisplay}
          <div className="my-2 flex flex-grow ">
            <div className="flex h-fit flex-grow items-center justify-around">
              <button
                onClick={() => setShowSubscribe(!showSubscribe)}
                className="h-16 rounded-full bg-indigo-600 px-5 py-2 shadow-md shadow-cyan-600 transition-all hover:scale-105 2xl:text-lg"
              >
                Subscribe to Emails
              </button>
              <div className="opacity-70">
                <a
                  href="https://www.instagram.com/act.sing.dance.repeat/"
                  target="_blank"
                >
                  <Image
                    src="/Instagram_Glyph_White.png"
                    alt="Follow Us on Instatram Here!"
                    width={40}
                    height={40}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto pb-3">&copy; 2023, Act. Sing. Dance. Repeat.</div>
    </div>
  );
}
