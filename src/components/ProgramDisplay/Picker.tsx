import { type NextPage } from "next";

import Link from "next/link";

type PickerProps = {
  buttonOptions: string[];
  currentLink: string;
  last: boolean;
};
const Picker: NextPage<PickerProps> = ({
  buttonOptions,
  currentLink,
  last,
}) => {
  const buttonDisplay = buttonOptions.map((option) => {
    const buttonName = `${option}_button`;
    let link = currentLink + "/" + option;

    if (!last) {
      link += "/select-next";
    }

    return (
      <Link href={link} key={buttonName} className="p-2">
        <button className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white">
          {option}
        </button>
      </Link>
    );
  });
  return <div className="p-4">{buttonDisplay}</div>;
};

export default Picker;
