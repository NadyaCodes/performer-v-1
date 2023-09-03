import React from "react";
import Link from "next/link";

export default function PatreonConnect() {
  return (
    <div>
      <Link href={"/patreon"}>
        <button className="rounded-full border-2 border-cyan-900 p-4 text-lg hover:scale-110">
          Connect Patreon
        </button>
      </Link>
    </div>
  );
}
