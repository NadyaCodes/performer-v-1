import React from "react";
import { ProgramWithInfo } from "../ProgramFinder/types";
import PageContent from "./PageContent";

export type PageContent = {
  textHeader: string;
  allProgramInfo: ProgramWithInfo | null;
};

export default function SingleProgramPageComponent({
  programid,
}: {
  programid: string;
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
      <PageContent programId={programid} />
    </div>
  );
}
