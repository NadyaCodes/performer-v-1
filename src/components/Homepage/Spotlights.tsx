import React from "react";

export default function Spotlights() {
  return (
    <div className="flex -translate-y-8 justify-center">
      <div className="" style={{ transform: "translateX(400px)" }}>
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
      <div className="" style={{ transform: "translateX(-640px)" }}>
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
  );
}
