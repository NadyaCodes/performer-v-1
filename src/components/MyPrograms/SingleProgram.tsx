import React, { type SetStateAction, useState, type Dispatch } from "react";
import type { ProgramWithInfo } from "../ProgramFinder/types";
import { displayDisciplineText } from "../ProgramFinder/helpers";
import Link from "next/link";
import type { Note } from "@prisma/client";
import {
  basicStar,
  cautionCircle,
  shareIcon,
  xMark,
} from "@component/data/svgs";
import DeleteCheck from "./DeleteCheck";
import type { ProgramWithType } from "./MyProgramsComponent";
import LoadingLines from "../Loading/LoadingLines";
import ShareOptions from "../ProgramFinder/ShareOptions";
import NoteDisplay from "./NoteDisplay";
import { usePatreon } from "@component/contexts/PatreonContext";
import NotesNoPatreon from "./NotesNoPatreon";

interface SingleProgramProps {
  program: ProgramWithInfo;
  loadingDelete: boolean | string;
  setLoadingDelete: Dispatch<SetStateAction<boolean | string>>;
  findUserFavs: (userId: string) => Promise<(ProgramWithType | undefined)[]>;
  setUserFavs: Dispatch<SetStateAction<(ProgramWithType | undefined)[] | null>>;
  notes: { [key: string]: Note[] } | [] | null;
  setNotes: React.Dispatch<
    React.SetStateAction<{ [key: string]: Note[] } | null | []>
  >;
}

const SingleProgram = React.forwardRef<HTMLDivElement, SingleProgramProps>(
  (
    { program, loadingDelete, setLoadingDelete, setUserFavs, notes, setNotes },
    ref
  ) => {
    const { patreonInfo } = usePatreon();
    const [noteInput, setNoteInput] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [removeComponent, setRemoveComponent] = useState<boolean>(false);
    const [share, setShare] = useState(false);

    return (
      <div
        className="relative my-12 flex w-full flex-col rounded-lg bg-cyan-100 bg-opacity-20 text-center shadow-md shadow-cyan-800"
        style={{ animation: "pullDownTop 1s linear" }}
        id={program.id}
        ref={ref}
      >
        <div
          className="flex w-full justify-between rounded-t-lg bg-cyan-800 bg-opacity-100 text-cyan-50 opacity-0 shadow-sm shadow-cyan-900"
          style={{ animation: "fadeIn 0.5s linear forwards" }}
        >
          <div className="mx-5 my-2">{basicStar}</div>
          <div className="mx-5 my-2">{basicStar}</div>
        </div>
        <button
          onClick={() => setRemoveComponent(true)}
          className="absolute right-4 mt-12 flex rounded-full border border-transparent p-0.5 text-cyan-900 hover:scale-110 hover:border hover:border-pink-400 hover:text-pink-400"
        >
          {xMark}
        </button>
        {removeComponent && program.favId && (
          <DeleteCheck
            setDeleteCheck={setRemoveComponent}
            id={program.favId}
            loadingDelete={loadingDelete}
            setUserFavs={setUserFavs}
            setLoadingDelete={setLoadingDelete}
            programId={program.id}
          />
        )}
        <div className="hidden h-0 translate-x-20 place-self-end mobileMenu:block">
          {share && <ShareOptions program={program} setShare={setShare} />}
        </div>

        <div className="my-1 flex flex-col items-center text-cyan-950 mobileMenu:p-2">
          <div className="m-2 mt-6 text-2xl font-bold capitalize">
            {program.schoolObj?.name}
          </div>
          <div className="text-xl font-bold capitalize">
            {"name" in program && program.name && <div>{program.name}</div>}
          </div>
          <div className="text-md font-normal capitalize">
            {program.cityObj?.city}, {program.cityObj?.province}
          </div>

          <div className="m-1 break-all italic text-cyan-600 underline">
            <Link href={program.website} target="blank">
              {program.website}
            </Link>
          </div>
          <div>
            {program.type === "ft" ? "Full Time " : "Part Time "}{" "}
            {displayDisciplineText(program.discipline)}
          </div>
          <div className="mb-3 w-48 border-b-2 border-cyan-600 p-2"></div>
          {patreonInfo && patreonInfo.id ? (
            <NoteDisplay
              noteInput={noteInput}
              program={program}
              setNoteInput={setNoteInput}
              setErrorMessage={setErrorMessage}
              notes={notes}
              setNotes={setNotes}
              type="fav"
            />
          ) : (
            <NotesNoPatreon />
          )}
        </div>
        {errorMessage && (
          <div className="fixed left-1/2 top-4 flex -translate-x-1/2 transform items-center border-2 border-pink-700 bg-pink-100 p-2 text-pink-700">
            {cautionCircle}
            <div className="mx-5">{errorMessage}</div>
            {cautionCircle}
          </div>
        )}
        {loadingDelete === program.id && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center rounded-lg"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
            }}
          >
            <div className="-translate-y-10">
              <LoadingLines />
            </div>
          </div>
        )}
        {!noteInput && (
          <div
            className="mb-5 mr-5 scale-110 place-self-end text-cyan-700 hover:scale-150"
            onClick={() => setShare(!share)}
          >
            {shareIcon}
          </div>
        )}
        <div className="h-0 place-self-end mobileMenu:hidden">
          {share && <ShareOptions program={program} setShare={setShare} />}
        </div>
      </div>
    );
  }
);

SingleProgram.displayName = "SingleProgram";

export default SingleProgram;
