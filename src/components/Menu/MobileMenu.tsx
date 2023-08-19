import { bars2 } from "@component/data/svgs";
import React from "react";

export default function MobileMenu() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-900 bg-cyan-50 text-cyan-900">
      {bars2}
    </div>
  );
}
