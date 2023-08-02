import React from "react";

export default function CircleSwell() {
  return (
    <div className="flex rotate-45">
      <div className="">
        <div className="fly-circle-1 h-52 w-52 rounded-full bg-cyan-200 blur-3xl"></div>
        <div className="fly-circle-2 h-52 w-52 rounded-full bg-yellow-200 blur-3xl"></div>
      </div>
      <div>
        <div className="fly-circle-3 h-52 w-52 rounded-full bg-green-200 blur-3xl"></div>
        <div className="fly-circle-4 h-52 w-52 rounded-full bg-purple-200 blur-3xl"></div>
      </div>
    </div>
  );
}
