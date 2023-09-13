import React, { useState } from "react";
import Picker from "@component/components/ProgramDirectory/Picker";
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
  const nextValueText =
    nextValue === "province" ? "Province/Territory" : nextValue;

  return (
    <div className="min-h-screen bg-cyan-50 bg-opacity-80 text-cyan-900">
      <Menu />
      <div
        className="absolute left-0 right-0 hidden h-10 mobileMenu:block"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
        }}
      ></div>
      <div className="hidden h-10 bg-cyan-950 mobileMenu:block "></div>
      <Link href={backLink} className="p-2">
        <button className="-mt-16 flex px-10 font-semibold text-cyan-800 hover:scale-110 md:mt-0">
          <span>{backChevron}</span>
          <span>Back</span>
        </button>
      </Link>

      <div className="flex flex-col items-center">
        <h1 className="mx-10 mt-4 w-9/12 text-center text-5xl font-extrabold capitalize tracking-tight 2xl:text-6xl">
          {titleString}
        </h1>
        <div className="m-8 h-2 w-10/12 rounded bg-indigo-900 bg-opacity-90 xl:m-16"></div>
        {loading ? (
          <LoadingLines />
        ) : (
          <>
            <div className="grid w-11/12 md:grid-cols-[2fr,1fr] 2xl:mb-10 2xl:w-8/12">
              <h2 className="justify-self-center text-center text-3xl font-extrabold capitalize tracking-tight text-cyan-800 md:w-128 md:text-4xl 2xl:w-160 2xl:text-5xl">
                Which {nextValueText}?
              </h2>
              <div className="hidden h-0 -translate-x-12 -translate-y-3 scale-50 md:flex">
                <Face eyesClass="eyesDown" />
              </div>
            </div>
            {/* <div className="mb-15 m-10 w-fit place-self-center rounded-lg bg-gradient-to-b from-cyan-600 to-cyan-900 p-5 text-cyan-50 shadow-xl shadow-cyan-700"> */}
            <div className="mb-15 m-10 mx-auto w-11/12 max-w-6xl rounded-lg bg-gradient-to-b from-cyan-600 to-cyan-900 p-5 text-cyan-50 shadow-xl shadow-cyan-700">
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
