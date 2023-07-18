import React, { useState } from "react";
import TypeMenu from "./TypeMenu";
import DisciplineMenu from "./DisciplineMenu";
import LocationMenu from "./LocationMenu";
import Search from "./Search";

export default function FilterMenu() {
  const options = [
    { option: "type", menu: <TypeMenu /> },
    {
      option: "discipline",
      menu: <DisciplineMenu />,
    },
    { option: "location", menu: <LocationMenu /> },
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
  return (
    <div className="flex">
      {buttonFilter}
      <Search />
    </div>
  );
}
