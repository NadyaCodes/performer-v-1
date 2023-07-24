import React from "react";
import { useSession } from "next-auth/react";

export default function MyProgramsComponent() {
  const { data: sessionData } = useSession();
  return <div>MyPrograms</div>;
}
