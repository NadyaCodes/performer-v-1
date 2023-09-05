import React from "react";
import Link from "next/link";

export default function NotesNoPatreon() {
  return (
    <Link
      href={"/patreon"}
      className="m-2 w-10/12 rounded bg-indigo-800 p-2 text-indigo-50 hover:scale-105 hover:shadow-md hover:shadow-indigo-900"
    >
      <div className="">Subscribe to Patreon to add your own notes!</div>
    </Link>
  );
}
