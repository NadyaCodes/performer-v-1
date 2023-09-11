import React from "react";
import AuthShowcase from "../Menu/AuthShowcase";
import H2Title from "./H2Title";

export default function MyProgramsNoSession() {
  return (
    <div className="flex flex-col items-center">
      <div
        className="absolute left-0 right-0 hidden h-10 bg-cyan-950 mobileMenu:block"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
        }}
      ></div>
      <div
        className="text-bold mt-10 flex w-full flex-col content-center items-center p-3 text-center text-lg text-cyan-900 mobileMenu:mt-20"
        style={{ animation: "fadeIn .7s linear" }}
      >
        <H2Title text="Saved Programs" icon="star" id="favsHeader" />
        <div
          className="m-2 font-bold opacity-0"
          style={{ animation: "pullDownTop .5s linear .2s forwards" }}
        >
          FUTURE HOME OF YOUR FAVORITE PROGRAMS
        </div>
        <div
          className="m-2 opacity-0"
          style={{ animation: "pullDownTop .5s linear .8s forwards" }}
        >
          This page requires a free account.
        </div>
        <div
          className="m-2 opacity-0"
          style={{ animation: "pullDownTop .5s linear 1.4s forwards" }}
        >
          Please sign in below.
        </div>
      </div>
      <div className="scale-150">
        <div
          className="text-cyan-900"
          style={{ animation: "wiggle .4s linear 2s 2" }}
        >
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
}
