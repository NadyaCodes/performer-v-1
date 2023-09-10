import {
  disciplinesFull,
  provincesFull,
  stylesFull,
} from "@component/data/constants";
import { type NextPage } from "next";

import Link from "next/link";
import type { SetStateAction, Dispatch } from "react";

type PickerProps = {
  buttonOptions: string[];
  currentLink: string;
  last: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
};
const Picker: NextPage<PickerProps> = ({
  buttonOptions,
  currentLink,
  last,
  setLoading,
}) => {
  const buttonDisplay = buttonOptions.map((option) => {
    const stylesKeys = Object.keys(stylesFull);
    const disciplinesKeys = Object.keys(disciplinesFull);
    const provincesKeys = Object.keys(provincesFull);
    let buttonText = option;
    const buttonName = `${option}_button`;
    let link;

    if (currentLink.endsWith("/")) {
      link = currentLink + option;
    } else {
      link = currentLink + "/" + option;
    }

    if (!last) {
      link += "/select-next";
    }

    if (stylesKeys.includes(option)) {
      buttonText = stylesFull[option] || option;
    }

    if (disciplinesKeys.includes(option)) {
      buttonText = disciplinesFull[option] || option;
    }

    if (provincesKeys.includes(option)) {
      buttonText = provincesFull[option] || option;
    }

    return (
      <Link
        href={link}
        key={buttonName}
        className="p-2"
        onClick={() => setLoading && setLoading(true)}
      >
        <button className="w-60 rounded bg-cyan-100 px-4 py-2 text-lg font-semibold capitalize text-cyan-900 shadow-md shadow-indigo-900 transition-all hover:scale-110 hover:bg-cyan-900 hover:text-cyan-50 hover:shadow-cyan-200">
          {buttonText}
        </button>
      </Link>
    );
  });
  return (
    <div className="flex max-w-6xl flex-wrap justify-center p-4">
      {buttonDisplay}
    </div>
  );
};

export default Picker;
