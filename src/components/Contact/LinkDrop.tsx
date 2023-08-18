import React from "react";
import Link from "next/link";

export default function LinkDrop({
  linkText,
  link,
}: {
  link: string;
  linkText: string;
}) {
  return (
    <div className="flex w-full justify-center transition-all">
      <div
        className="rounded-lg bg-cyan-100 bg-opacity-70 p-7 font-bold underline shadow-md shadow-cyan-800 transition-all"
        style={{ animation: "pullDownTop 0.5s linear forwards" }}
      >
        <Link href={link} target="_blank">
          {linkText}
        </Link>
      </div>
    </div>
  );
}
