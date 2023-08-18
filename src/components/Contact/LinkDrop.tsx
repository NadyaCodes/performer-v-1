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
    <div className="flex w-full justify-center tracking-wider text-cyan-200 transition-all">
      <div
        className="rounded-lg p-5 font-bold underline shadow-md shadow-cyan-800 transition-all"
        style={{ animation: "pullDownTop 0.5s linear forwards" }}
      >
        <Link href={link} target="_blank">
          {linkText}
        </Link>
      </div>
    </div>
  );
}
