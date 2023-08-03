import React from "react";

export default function ContactComponent() {
  return (
    <div className=" min-h-screen bg-black">
      <div className="flex overflow-hidden text-5xl font-extrabold tracking-tight text-white sm:text-[9rem]">
        <div
          className="ticker-text flex whitespace-nowrap pr-1"
          style={{ animation: "ticker 10s linear infinite" }}
        >
          ACT. SING. DANCE. REPEAT.
        </div>
        <div
          className="ticker-text flex whitespace-nowrap"
          style={{ animation: "ticker 10s linear infinite" }}
        >
          ACT. SING. DANCE. REPEAT.
        </div>
        <div
          className="ticker-text flex whitespace-nowrap"
          style={{ animation: "ticker 10s linear infinite" }}
        >
          ACT. SING. DANCE. REPEAT.
        </div>
      </div>
    </div>
  );
}
