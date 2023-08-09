import React from "react";

export default function LogoTicker() {
  return (
    <div
      className="relative bg-cyan-950"
      style={{
        paddingBottom: "12px",
      }}
    >
      <div className="flex overflow-hidden text-5xl font-extrabold tracking-tight text-white sm:text-[9rem]">
        <div
          className="ticker-text flex whitespace-nowrap pr-1"
          style={{
            animation: "ticker 10s linear infinite",
          }}
        >
          ACT. SING. DANCE. REPEAT.
        </div>
        <div
          className="ticker-text flex whitespace-nowrap"
          style={{
            animation: "ticker 10s linear infinite",
          }}
        >
          ACT. SING. DANCE. REPEAT.
        </div>
        <div
          className="ticker-text flex whitespace-nowrap"
          style={{
            animation: "ticker 10s linear infinite",
          }}
        >
          ACT. SING. DANCE. REPEAT.
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5), inset 0px -8px 16px rgba(0,255,255,0.5)",
        }}
      ></div>
    </div>
  );
}
