import React from "react";

export default function TitleHeader({ titleString }: { titleString: string }) {
  return (
    <div
      className="relative w-screen bg-cyan-950"
      style={{
        boxShadow:
          "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5), inset 0px -8px 16px rgba(0,255,255,0.5)",
      }}
    >
      <h1 className="flex  justify-center p-10 text-center text-5xl font-extrabold capitalize text-cyan-50 sm:text-[3rem]">
        {titleString}
      </h1>
    </div>
  );
}
