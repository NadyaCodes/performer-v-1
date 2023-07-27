import React from "react";
import Picker from "@component/components/ProgramDisplay/Picker";
import { styles } from "@component/data/constants";
import Menu from "@component/components/Menu/Menu";

export default function CourseSelector() {
  return (
    <div>
      <Menu />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
          What kind of program are you looking for?
        </h1>
        <div
          style={{
            display: "flex",
            margin: "2rem",
          }}
          className="rounded border-2 border-green-300"
        >
          <Picker buttonOptions={styles} currentLink="" last={false} />
        </div>
      </div>
    </div>
  );
}
