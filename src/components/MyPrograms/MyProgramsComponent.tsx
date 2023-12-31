import React from "react";
import { useSession } from "next-auth/react";
import MyProgramsWithSession from "./MyProgramsWithSession";
import MyProgramsNoSession from "./MyProgramsNoSession";

export type ProgramWithType = {
  id: string;
  schoolLocationId: string;
  website: string;
  discipline: string;
  name?: string;
  type: string;
  favProgramId?: string;
  articlePitch?: string | null;
  elevatorPitch?: string | null;
};

export type KeyValueListType = {
  type: string;
  componentRef?: React.RefObject<HTMLDivElement> | undefined;
  id: string | null;
  text: string;
};

export default function MyProgramsComponent() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id || null;

  return (
    <div>
      {userId ? (
        <MyProgramsWithSession userId={userId} />
      ) : (
        <MyProgramsNoSession />
      )}
    </div>
  );
}
