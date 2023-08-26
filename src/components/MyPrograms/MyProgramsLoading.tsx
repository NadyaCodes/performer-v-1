import React from "react";
import LoadingPrograms from "./LoadingPrograms";
import LoadingLines from "../Loading/LoadingLines";

export default function MyProgramsLoading() {
  return (
    <div className="flex justify-center">
      <div
        className="absolute left-0 right-0 hidden h-10 bg-cyan-950 mobileMenu:block"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
        }}
      ></div>
      <div className="w-fullxs:w-11/12 flex translate-y-2 justify-center mobileMenu:w-7/12">
        <div
          className="mt-10 flex w-full justify-between place-self-center text-lg font-semibold text-cyan-800 opacity-0 xs:w-11/12 xs:text-xl sm:text-3xl md:mt-20 mobileMenu:w-7/12"
          style={{ animation: "fadeIn .8s forwards" }}
        >
          <LoadingPrograms />
        </div>
        <div className="pt-60">
          <LoadingLines />
        </div>
      </div>
    </div>
  );
}
