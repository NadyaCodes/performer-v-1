import React from "react";
import AuthShowcase from "./AuthShowcase";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Menu() {
  const { data: sessionData } = useSession();

  const programsLinkClass = sessionData
    ? "flex rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white"
    : "flex rounded border border-blue-200 bg-blue-900 px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white";

  return (
    <div className="fitems-center flex justify-center space-x-10 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Link
        href={"/program-search"}
        className="flex rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white"
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
  );
}