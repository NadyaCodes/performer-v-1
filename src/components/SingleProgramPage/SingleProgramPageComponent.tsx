import React from "react";
import type { ProgramWithInfo } from "../ProgramFinder/types";
import PageContent from "./PageContent";
import { useSession } from "next-auth/react";

export type PageContent = {
  textHeader: string;
  allProgramInfo: ProgramWithInfo | null;
};

export default function SingleProgramPageComponent({
  programid,
}: {
  programid: string;
}) {
  const { data: sessionData } = useSession();
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
      {sessionData?.user && (
        <div className="-mt-5 hidden w-screen justify-end pr-2 text-sm italic text-cyan-900 mobileMenu:flex mobileMenu:pr-4">
          <span>Logged in as: {sessionData.user.name}</span>
        </div>
      )}
      <PageContent programId={programid} />
    </div>
  );
}
