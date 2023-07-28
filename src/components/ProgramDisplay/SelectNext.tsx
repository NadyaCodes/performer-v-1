import React, { useEffect, useState } from "react";
import Picker from "@component/components/ProgramDisplay/Picker";
import Link from "next/link";
import Menu from "../Menu/Menu";
import LoadingLines from "../Loading/LoadingLines";

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

  //   useEffect(() => {
  // setLoading(false)
  //   }, [])

  return (
    <div>
      <Menu />
      <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="m-20 text-5xl font-extrabold capitalize tracking-tight text-white sm:text-[3rem]">
          {titleString}
        </h1>
        {loading ? (
          <LoadingLines />
        ) : (
          <>
            <h2 className="text-5xl font-extrabold capitalize tracking-tight text-white sm:text-[5rem]">
              Which {nextValue}?
            </h2>
            <div
              style={{
                display: "flex",
                margin: "2rem",
              }}
              className="rounded border-2 border-green-300"
            >
              <Picker
                buttonOptions={buttonList}
                currentLink={link}
                last={nextValue === "city" ? true : false}
                setLoading={setLoading}
              />
            </div>
            <Link href={backLink} className="p-2">
              <button className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white">
                Back
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectNext;
