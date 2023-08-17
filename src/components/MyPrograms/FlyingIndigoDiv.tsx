import React from "react";

export default function FlyingIndigoDiv() {
  return (
    <div
      className="h-1 w-2/3 justify-center rounded-full bg-gradient-to-b from-indigo-100 to-indigo-300 text-cyan-950 opacity-0 shadow-lg shadow-cyan-900"
      style={{ animation: "flyInFadeIn 0.5s linear 2s forwards" }}
    ></div>
  );
}
