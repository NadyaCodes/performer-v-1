import React, { useState } from "react";
import { ProgramWithInfo } from "./types";
import { useSession } from "next-auth/react";

import { displayDisciplineText } from "./helpers";

export default function ProgramItem({ element }: { element: ProgramWithInfo }) {
  const { data: sessionData } = useSession();
  const [fav, setFav] = useState(false);
  return (
    <div className="m-10 flex flex-col border-2 border-purple-200">
      {sessionData?.user && (
        <div className="mx-5 my-2 place-self-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={fav ? "#c084fc" : "none"}
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="#c084fc"
            className="h-6 w-6"
            onClick={() => setFav(!fav)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="text-sm italic">{element.id}</div>
        <div className="text-xl font-bold capitalize">
          {"name" in element && element.name && <div>{element.name}</div>}
        </div>
        <div className="text-lg font-bold capitalize">
          {element.schoolObj?.name}
        </div>
        <div className="text-md font-normal capitalize">
          {element.cityObj?.city}, {element.cityObj?.province}
        </div>

        <div className="italic">{element.website}</div>
        <div>
          {element.type === "ft" ? "Full Time " : "Part Time "}{" "}
          {displayDisciplineText(element.discipline)}{" "}
        </div>
      </div>
    </div>
  );
}
