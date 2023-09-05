import React from "react";
import Link from "next/link";

export default function CustomNoPatreon() {
  return (
    <div className="mb-10">
      <Link href={"/patreon"}>
        <div className="m-2 w-full rounded bg-indigo-800 p-10 text-xl font-semibold text-indigo-50 hover:scale-105 hover:shadow-md hover:shadow-indigo-900">
          Subscribe to Patreon to add your own Custom Programs!
        </div>
      </Link>
    </div>
  );
}
