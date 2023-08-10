import Menu from "@component/components/Menu/Menu";
import MyProgramsComponent from "@component/components/MyPrograms/MyProgramsComponent";
import React from "react";

export default function MyPrograms() {
  return (
    <div className="min-h-screen bg-cyan-50 bg-opacity-80">
      <Menu />
      <MyProgramsComponent />
    </div>
  );
}
