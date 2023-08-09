import React from "react";
import Picker from "@component/components/ProgramSelector/Picker";
import { styles } from "@component/data/constants";
import Menu from "@component/components/Menu/Menu";
import Face from "@component/components/ProgramSelector/Face";

export default function CourseSelector() {
  return (
    <div className="min-h-screen bg-cyan-50 bg-opacity-80 text-cyan-900">
      <Menu />
      <div
        className="absolute left-0 right-0 h-10"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
        }}
      ></div>
      <div className="mb-10 h-10 bg-cyan-950"></div>
      <div className="flex flex-col items-center">
        <h1 className="mx-10 mt-10 w-9/12 text-center text-6xl font-extrabold tracking-tight ">
          What kind of program are you looking for?
        </h1>
        <div className="m-8 h-2 w-10/12 rounded bg-indigo-900 bg-opacity-90"></div>
        <div className="m-5 w-1/2  place-self-center rounded-lg bg-gradient-to-b from-cyan-600 to-cyan-900 p-5 text-cyan-50 shadow-xl shadow-cyan-700">
          <Picker buttonOptions={styles} currentLink="" last={false} />
        </div>
        <div className="-mt-10">
          <Face />
        </div>
      </div>
    </div>
  );
}
