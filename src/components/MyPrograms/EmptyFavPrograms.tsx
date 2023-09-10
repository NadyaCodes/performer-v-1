import React from "react";
import Link from "next/link";
import { basicStar } from "@component/data/svgs";

export default function EmptyFavPrograms() {
  return (
    <div
      className="relative flex w-full flex-col rounded-lg bg-cyan-100 bg-opacity-20 text-cyan-900 shadow-md shadow-cyan-800"
      style={{ animation: "fadeInGrow 1s linear" }}
    >
      <div
        className="flex w-full justify-between rounded-t-lg bg-cyan-800 bg-opacity-100 text-cyan-50 opacity-0 shadow-sm shadow-cyan-900"
        style={{ animation: "fadeIn 1.5s linear forwards" }}
      >
        <div className="mx-5 my-2">{basicStar}</div>
        <div className="mx-5 my-2">{basicStar}</div>
      </div>
      <div className="p-4 text-center">
        <div className="p-3">
          Explore the{" "}
          <Link
            href="/program-finder"
            className="font-bold hover:text-cyan-700"
          >
            Program Finder
          </Link>{" "}
          or{" "}
          <Link
            className="font-bold hover:text-cyan-700"
            href="/program-directory"
          >
            Program Directory
          </Link>{" "}
          to add programs to your list
        </div>

        <Link href="/program-finder">
          <button className="m-4 rounded-lg border-2 border-cyan-800 p-3 font-bold hover:scale-110 hover:bg-cyan-800 hover:text-cyan-50 hover:shadow-lg hover:shadow-cyan-700">
            Find Programs
          </button>
        </Link>
      </div>
    </div>
  );
}
