import React from "react";
import Link from "next/link";

export default function PatreonPageLink({ text }: { text: string }) {
  return (
    <Link href={"/patreon"}>
      <button className="rounded-full border-2 border-cyan-900 p-3 text-lg shadow-md shadow-cyan-600 transition-all hover:scale-110 hover:shadow-lg hover:shadow-cyan-800">
        {text}
      </button>
    </Link>
  );
}
