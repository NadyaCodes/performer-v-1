import React from "react";
import LogoTicker from "./LogoTicker";

export default function AboutComponent() {
  return (
    <div className="flex w-screen flex-col overflow-hidden">
      <LogoTicker />
      <div className="">Words</div>
    </div>
  );
}
