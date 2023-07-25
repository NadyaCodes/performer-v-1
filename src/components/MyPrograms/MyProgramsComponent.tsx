import React from "react";
import { useSession } from "next-auth/react";

export default function MyProgramsComponent() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;

  return <div>MyPrograms</div>;
}
