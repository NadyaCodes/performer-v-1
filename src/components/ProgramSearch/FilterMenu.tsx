import React, { useState, useContext } from "react";
import TypeMenu from "./TypeMenu";
import DisciplineMenu from "./DisciplineMenu";
import { FilterContext } from "./ProgramFilter";

export default function FilterMenu() {
  const filterContext = useContext(FilterContext);
  const selectedOptions = filterContext?.selectedOptions;
  const setSelectedOptions = filterContext?.setSelectedOptions;

  const updateFilter = (element: string, value: string) => {
    selectedOptions &&
      setSelectedOptions &&
      setSelectedOptions({ ...selectedOptions, [element]: value });
  };

  const locationMenu = <div>Location Menu</div>;
  const options = [
    { option: "type", menu: <TypeMenu updateFilter={updateFilter} /> },
    {
      option: "discipline",
      menu: <DisciplineMenu updateFilter={updateFilter} />,
    },
    { option: "location", menu: locationMenu },
  ];

  const buttonFilter = options.map((element) => {
    const [menu, setMenu] = useState(false);
    return (
      <div className="m-2" key={element.option}>
        <button
          className="rounded border-2 border-blue-300 p-2 capitalize"
          onClick={() => setMenu(!menu)}
        >
          {element.option}
        </button>
        {menu && (
          <div>
            <div>Pick Your {element.option.toUpperCase()}</div>
            <div>{element.menu}</div>
          </div>
        )}
      </div>
    );
  });
  return <div className="flex">{buttonFilter}</div>;
}