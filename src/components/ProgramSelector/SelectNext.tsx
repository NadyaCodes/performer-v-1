import React, { useState } from "react";
import Picker from "@component/components/ProgramSelector/Picker";
import Link from "next/link";
import Menu from "../Menu/Menu";
import LoadingLines from "../Loading/LoadingLines";
import { backChevron } from "@component/data/svgs";
import Face from "./Face";

interface SelectNextProps {
  selectNextOptions: {
    style: string;
    discipline?: string;
    province?: string;
    link: string;
    backLink: string;
    nextValue: string;
    buttonList: string[];
    titleString: string;
  };
}

const SelectNext: React.FC<SelectNextProps> = ({ selectNextOptions }) => {
  const { buttonList, titleString, link, backLink, nextValue } =
    selectNextOptions;
  const [loading, setLoading] = useState(false);

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
      <div className="h-10 bg-cyan-950"></div>
      <Link href={backLink} className="p-2">
        <button className="flex px-10 font-semibold text-cyan-800 hover:scale-110">
          <span>{backChevron}</span>
          <span>Back</span>
        </button>
      </Link>

      <div className="flex flex-col items-center">
        <h1 className="mx-10 mt-4 w-9/12 text-center text-5xl font-extrabold capitalize tracking-tight">
          {titleString}
        </h1>
        <div className="m-8 h-2 w-10/12 rounded bg-indigo-900 bg-opacity-90"></div>
        {loading ? (
          <LoadingLines />
        ) : (
          <>
            <div className="flex justify-center">
              <h2 className="justify-self-center text-5xl font-extrabold capitalize tracking-tight text-cyan-800 sm:text-[5rem]">
                Which {nextValue}?
              </h2>
              <div className="h-0 -translate-y-9 scale-50">
                <Face />
              </div>
            </div>
            <div className="mb-15 m-10 w-fit place-self-center rounded-lg bg-gradient-to-b from-cyan-600 to-cyan-900 p-5 text-cyan-50 shadow-xl shadow-cyan-700">
              <Picker
                buttonOptions={buttonList}
                currentLink={link}
                last={nextValue === "city" ? true : false}
                setLoading={setLoading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectNext;
