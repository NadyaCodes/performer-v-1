import React from "react";

export default function Spotlights() {
  return (
    <div className="flex -translate-y-8 justify-center">
      <div className="xl:translate-x-24 2xl:translate-x-40">
        <div className="translate-x-52 md:translate-x-72 lg:translate-x-96">
          <div
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: "110px solid transparent",
              borderRight: "110px solid transparent",
              borderBottom: "700px solid #cffafe40",
              animation: "spotlightRight 2s linear forwards",
              overflow: "hidden",
            }}
          ></div>
        </div>
      </div>
      <div className="-translate-x-12 md:-translate-x-32 lg:-translate-x-52 xl:-translate-x-80 2xl:-translate-x-96">
        <div className="-translate-x-96">
          <div
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: "110px solid transparent",
              borderRight: "110px solid transparent",
              borderBottom: "700px solid #cffafe40",
              animation: "spotlightLeft 2s linear forwards",
              overflow: "hidden",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
