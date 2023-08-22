import React from "react";

export default function Spotlights() {
  return (
    <div className="hidden -translate-y-8 justify-center lg:flex">
      <div className="xl:translate-x-32 2xl:translate-x-40">
        <div className="translate-x-40 sm:translate-x-52 md:translate-x-72 lg:translate-x-96">
          <div
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: "130px solid transparent",
              borderRight: "130px solid transparent",
              borderBottom: "900px solid #cffafe40",
              animation: "spotlightRight 2s linear forwards",
              overflow: "hidden",
            }}
          ></div>
        </div>
      </div>
      <div className="2xl:-translate-x-10">
        <div className="-translate-x-9 sm:-translate-x-20 md:-translate-x-40 lg:-translate-x-64 xl:-translate-x-96">
          <div className="-translate-x-96">
            <div
              className="absolute"
              style={{
                width: 0,
                height: 0,
                borderLeft: "130px solid transparent",
                borderRight: "130px solid transparent",
                borderBottom: "900px solid #cffafe40",
                animation: "spotlightLeft 2s linear forwards",
                overflow: "hidden",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
