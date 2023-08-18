import React from "react";
import Link from "next/link";

export default function LinkDrop({
  website,
  link,
}: {
  link?: string;
  website: string;
}) {
  return (
    <div className="flex w-full justify-center transition-all">
      <div
        className="rounded-lg bg-cyan-100 bg-opacity-70 p-7 shadow-md shadow-cyan-800 transition-all"
        style={{ animation: "pullDownTop 0.5s linear forwards" }}
      >
        <Link href={link || website}>{website}</Link>
      </div>
    </div>
  );
}
