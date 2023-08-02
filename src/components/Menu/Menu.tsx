import React from "react";
import AuthShowcase from "./AuthShowcase";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Menu() {
  const { data: sessionData } = useSession();

  const programsLinkClass = sessionData
    ? "mb-2 flex rounded-t-md border-b-2 border-transparent bg-transparent px-4 py-2 font-semibold transition-all hover:border-cyan-700 "
    : "mb-2 flex rounded-t-md border-b-2 border-transparent text-cyan-500 px-4 py-2 font-semibold transition-all ";

  // bg-gradient-to-b from-[#2e026d] to-[#15162c]

  return (
    <div
      className="flex w-full flex-col items-center space-y-10 border-b-2 bg-cyan-50 p-3 text-cyan-900"
      style={{
        boxShadow:
          "0px 1px 2px rgba(0,255,255,0.5), 0px 2px 4px rgba(0,255,255,0.5), 0px 4px 8px rgba(0,255,255,0.5), 0px 8px 16px rgba(0,255,255,0.5)",
      }}
    >
      <div className="flex w-10/12 justify-between">
        <Link
          href={"/"}
          className="mb-2 flex rounded-t-md border-b-2 border-transparent bg-transparent px-4 py-2 font-semibold  transition-all hover:border-cyan-700 "
        >
          <button className="">Home</button>
        </Link>
        <Link
          href={sessionData ? "/course-selector" : "#"}
          className="mb-2 flex rounded-t-md border-b-2 border-transparent bg-transparent px-4 py-2 font-semibold transition-all hover:border-cyan-700 "
        >
          <button className="">Course Selector</button>
        </Link>
        <Link
          href={"/program-search"}
          className="mb-2 flex rounded-t-md border-b-2 border-transparent bg-transparent px-4 py-2 font-semibold transition-all hover:border-cyan-700 "
        >
          <button className="">Course Finder</button>
        </Link>

        <Link
          href={sessionData ? "/my-programs" : "#"}
          className={programsLinkClass}
        >
          <button className="">My Programs</button>
        </Link>
        <AuthShowcase />
      </div>
    </div>
  );
}
