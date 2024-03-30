import React, { useState } from "react";
import Picker from "@component/components/ProgramDirectory/Picker";
import Link from "next/link";
import LoadingLines from "../Loading/LoadingLines";
import { backChevron } from "@component/data/svgs";
import Face from "./Face";
import dynamic from "next/dynamic";
import { disciplinesFull, provincesFull } from "@component/data/constants";
import { doubleChevronDown } from "@component/data/svgs";

const Menu = dynamic(() => import("@component/components/Menu/Menu"), {
  ssr: true,
});

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
  const {
    buttonList,
    titleString,
    link,
    backLink,
    nextValue,
    style,
    discipline,
    province,
  } = selectNextOptions;
  const [loading, setLoading] = useState(false);
  const nextValueText =
    nextValue === "province" ? "Province/Territory" : nextValue;

  let backTextMain = "Back";
  let backTextSub = "";
  let selectText = `Select ${nextValueText}`;

  let scrollTextMain: string | null = "";
  let scrollTextSub = "Programs in Canada";

  if (province) {
    backTextMain = "Change Province";
    scrollTextSub = `Programs in ${province ? provincesFull[province] : ""}`;
  } else if (discipline) {
    backTextMain = "Change Discipline";
    backTextSub = "  (Acting, Singing, Dance, Musical Theatre)";
  } else if (style) {
    backTextMain = "Change Type";
    backTextSub = "  (Part Time, Full Time)";
  }

  if (discipline) {
    selectText = `...or Select By ${nextValueText}`;
    scrollTextMain =
      discipline !== undefined && disciplinesFull.hasOwnProperty(discipline)
        ? (disciplinesFull[discipline] as string)
        : null;
  }

  return (
    <div className="flex flex-grow flex-col bg-cyan-50 bg-opacity-80 text-cyan-900">
      <div>
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
          <button className="-mt-16 mb-3 flex w-60 items-center justify-center border-r-2 border-cyan-800 px-2 font-semibold text-cyan-800 transition-all hover:bg-indigo-50 hover:text-indigo-900 md:mt-0 md:w-fit">
            <span className="m-1">{backChevron}</span>
            <span className="m-1 flex flex-col items-center">
              <span>{backTextMain}</span>
              <span className="text-sm font-normal">{backTextSub}</span>
            </span>
          </button>
        </Link>
      </div>

      <div className="flex flex-grow flex-col items-center justify-start xl:mt-10 3xl:mt-20">
        <h1 className="mx-10 mt-4 w-9/12 text-center text-5xl font-extrabold capitalize tracking-tight 2xl:text-6xl">
          {titleString}
        </h1>
        <div className="m-8 h-2 w-10/12 rounded bg-indigo-900 bg-opacity-90 xl:m-16"></div>
        {loading ? (
          <div className="h-32">
            <LoadingLines />
          </div>
        ) : (
          <>
            {discipline && (
              <>
                <button className="m-2 w-80 -translate-y-3 rounded-xl border-4 border-indigo-300 bg-gradient-to-b  from-cyan-900 to-cyan-600 px-5 py-3 text-2xl font-semibold capitalize text-cyan-100 shadow-lg shadow-indigo-900 transition-all hover:scale-110 hover:bg-cyan-900 hover:text-cyan-50 hover:shadow-cyan-200 lg:-translate-y-8">
                  <Link href="#all_programs" className="flex flex-col text-xl">
                    <span className="flex items-center justify-center">
                      <span className="mr-5">{doubleChevronDown}</span>Scroll To
                      All
                      <span className="ml-5">{doubleChevronDown}</span>
                    </span>
                    <span className="text-3xl text-indigo-300">
                      {scrollTextMain}
                    </span>
                    <span className="">{scrollTextSub}</span>
                  </Link>
                </button>
              </>
            )}
            <div className="grid w-11/12 md:grid-cols-[2fr,1fr]">
              <h2 className="justify-self-left m-2 text-center text-3xl font-extrabold capitalize tracking-tight text-cyan-800 md:text-4xl 2xl:text-5xl">
                {selectText}
              </h2>
              <div className="hidden h-0 -translate-x-12 scale-50 md:flex">
                <Face eyesClass="eyesDown" />
              </div>
            </div>

            <div className="mx-auto w-11/12 max-w-6xl rounded-lg bg-gradient-to-b from-cyan-600 to-cyan-900 p-5 text-cyan-50 shadow-xl shadow-cyan-700">
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
