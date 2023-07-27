import React from "react";
import Picker from "@component/components/ProgramDisplay/Picker";
import Link from "next/link";
import Menu from "../Menu/Menu";

interface SelectNextProps {
  selectNextOptions: {
    style: string;
    discipline?: string;
    province?: string;
    link: string;
    backLink: string;
    nextValue: string;
  };
  buttonList: string[];
}

const SelectNext: React.FC<SelectNextProps> = ({
  selectNextOptions,
  buttonList,
}) => {
  return (
    <div>
      <Menu />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-5xl font-extrabold capitalize tracking-tight text-white sm:text-[5rem]">
          Which {selectNextOptions.nextValue}?
        </h1>
        <div
          style={{
            display: "flex",
            margin: "2rem",
          }}
          className="rounded border-2 border-green-300"
        >
          <Picker
            buttonOptions={buttonList}
            currentLink={selectNextOptions.link}
            last={selectNextOptions.nextValue === "city" ? true : false}
          />
        </div>
        <Link href={selectNextOptions.backLink} className="p-2">
          <button className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectNext;
