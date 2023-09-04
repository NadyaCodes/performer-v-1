import React from "react";
import Link from "next/link";

export default function PatreonPageLink({ text }: { text: string }) {
  return (
    <Link href={"/patreon"}>
      <button className="rounded-full border-2 border-cyan-900 p-4 text-lg hover:scale-110">
        {text}
      </button>
    </Link>
  );
}
