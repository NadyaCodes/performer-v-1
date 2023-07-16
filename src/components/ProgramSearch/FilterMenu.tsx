import React, { useState, useContext } from "react";
import TypeMenu from "./TypeMenu";
// import { FilterContext } from "./ProgramFilter";
// import { FilterContextState } from "./ProgramFilter";
import { FilterContext, FilterContextState } from "./ProgramFilter";

export default function FilterMenu() {
  // const { selectedOptions, setSelectedOptions } =
  //   useContext<FilterContextState>(FilterContext);
  // console.log(selectedOptions);
  const filterContext = useContext(FilterContext);
  const selectedOptions = filterContext?.selectedOptions;
  const setSelectedOptions = filterContext?.setSelectedOptions;
  // const { selectedOptions, setSelectedOptions } =
  //   useContext<FilterContextState>(FilterContext);

  // const { selectedOptions, setSelectedOptions } = useContext(FilterContext);
  // const [displayFilter, setDisplayFilter] = useState({
  //   type: "",
  //   discipline: "",
  //   location: "",
  // });

  const updateFilter = (element: string, value: string) => {
    selectedOptions &&
      setSelectedOptions &&
      setSelectedOptions({ ...selectedOptions, [element]: value });
  };

  const disciplineMenu = <div>Discipline Menu</div>;
  const locationMenu = <div>Location Menu</div>;
  const options = [
    { option: "type", menu: <TypeMenu updateFilter={updateFilter} /> },
    { option: "discipline", menu: disciplineMenu },
    { option: "location", menu: locationMenu },
  ];

  const buttonFilter = options.map((element) => {
    const [menu, setMenu] = useState(false);
    return (
      <div className="m-2">
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
