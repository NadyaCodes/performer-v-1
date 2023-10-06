import React from "react";

export default function ShockFace() {
  return (
    <div className="flex scale-50 content-center justify-center mobileMenu:scale-75">
      <div className="shockFace bg-indigo-300">
        <div className="eyes scale-110">
          <div
            className="eye bg-cyan-50"
            style={{ transform: "rotate(-120deg)" }}
          ></div>
          <div
            className="eye bg-cyan-50"
            style={{ transform: "rotate(-60deg)" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
