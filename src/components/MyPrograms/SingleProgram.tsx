import React from "react";
import { ProgramWithInfo } from "../ProgramSearch/types";
import { displayDisciplineText } from "../ProgramSearch/helpers";
import Link from "next/link";

type SingleProgramProps = {
  program: ProgramWithInfo;
};

const SingleProgram: React.FC<SingleProgramProps> = ({ program }) => {
  return (
    <div className="m-10 flex flex-col border-2 border-purple-200">
      <div className="flex justify-between">
        <div className="mx-5 my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#c084fc"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="#c084fc"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
        <div className="mx-5 my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#c084fc"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="#c084fc"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-sm italic">{program.id}</div>
        <div className="text-xl font-bold capitalize">
          {"name" in program && program.name && <div>{program.name}</div>}
        </div>
        <div className="text-lg font-bold capitalize">
          {program.schoolObj?.name}
        </div>
        <div className="text-md font-normal capitalize">
          {program.cityObj?.city}, {program.cityObj?.province}
        </div>

        <div className="italic">
          <Link href={program.website} target="blank">
            {program.website}
          </Link>
        </div>
        <div>
          {program.type === "ft" ? "Full Time " : "Part Time "}{" "}
          {displayDisciplineText(program.discipline)}{" "}
        </div>
      </div>
    </div>
  );
};

export default SingleProgram;
