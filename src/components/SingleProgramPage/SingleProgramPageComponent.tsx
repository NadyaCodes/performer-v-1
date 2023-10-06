import React from "react";
import type { ProgramWithType } from "../MyPrograms/MyProgramsComponent";
import dynamic from "next/dynamic";

const PageContent = dynamic(() => import("./PageContent"), {
  ssr: true,
});

export default function SingleProgramPageComponent({
  programObject,
}: {
  programObject: ProgramWithType | null;
}) {
  return (
    <div className="overflow-x-hidden">
      <div className="hidden mobileMenu:block">
        <div
          className="absolute left-0 right-0 h-10"
          style={{
            boxShadow:
              "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
          }}
        ></div>
        <div className="mb-10 h-10 bg-cyan-950"></div>
      </div>
      <PageContent programObject={programObject} />
    </div>
  );
}
