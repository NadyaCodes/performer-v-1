import React, { useState } from "react";
import Link from "next/link";
import type { CustomProgram, Note } from "@prisma/client";
import {
  cautionCircle,
  pencilBox,
  basicStar,
  xMark,
} from "@component/data/svgs";
import LoadingLines from "../Loading/LoadingLines";
import DeleteCheck from "./DeleteCheck";
import NoteDisplay from "./NoteDisplay";
import { usePatreon } from "@component/contexts/PatreonContext";
import NotesNoPatreon from "./NotesNoPatreon";

interface SingleCustomProps {
  program: CustomProgram;
  setDisplayCustom: React.Dispatch<
    React.SetStateAction<CustomProgram[] | undefined | null>
  >;
  setShowUpdateCustom: React.Dispatch<
    React.SetStateAction<CustomProgram | boolean>
  >;
  loadingDelete: string | boolean;
  setLoadingDelete: React.Dispatch<React.SetStateAction<string | boolean>>;
  notes: { [key: string]: Note[] } | [] | null;
  setNotes: React.Dispatch<
    React.SetStateAction<{ [key: string]: Note[] } | null | []>
  >;
  animate: boolean;
}

const SingleCustom = React.forwardRef<HTMLDivElement, SingleCustomProps>(
  (
    {
      program,
      setDisplayCustom,
      setShowUpdateCustom,
      loadingDelete,
      setLoadingDelete,
      notes,
      setNotes,
      animate,
    },
    ref
  ) => {
    const { patreonInfo } = usePatreon();

    const [noteInput, setNoteInput] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [deleteCheck, setDeleteCheck] = useState<boolean>(false);

    const typesArray = [];
    if (program.typeFt) {
      typesArray.push("Full Time");
    }
    if (program.typePt) {
      typesArray.push("Part Time");
    }

    const disciplinesArray = [];
    if (program.disciplineAct) {
      disciplinesArray.push("Acting");
    }
    if (program.disciplineSing) {
      disciplinesArray.push("Singing");
    }
    if (program.disciplineDance) {
      disciplinesArray.push("Dance");
    }
    if (program.disciplineMT) {
      disciplinesArray.push("Musical Theatre");
    }

    const locationArray = [];
    if (program.city) {
      locationArray.push(program.city);
    }
    if (program.province) {
      locationArray.push(program.province);
    }
    if (program.country) {
      locationArray.push(program.country);
    }

    const updateCustomProgram = () => {
      window.scrollTo({
        top: 290,
        behavior: "smooth",
      });
      setShowUpdateCustom(program);
    };

    return (
      <div
        className="relative my-12 flex w-full flex-col rounded-lg bg-indigo-100 bg-opacity-20 text-center shadow-md shadow-indigo-900"
        style={{ animation: animate ? "pullDownTop 1s linear" : "" }}
        id={program.id}
        ref={ref}
      >
        <div
          className="flex w-full justify-between rounded-t-lg bg-indigo-900 bg-opacity-100 text-indigo-50 shadow-sm shadow-indigo-900"
          style={{
            animation: animate
              ? "fadeIn 0.5s linear forwards"
              : "fadeIn 0s linear forwards",
          }}
        >
          <div className="mx-5 my-2">{basicStar}</div>
          <div className="mx-5 my-2">{basicStar}</div>
        </div>
        {loadingDelete === program.id && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-lg"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
            }}
          >
            <div className="-translate-y-10">
              <LoadingLines />
            </div>
          </div>
        )}

        {deleteCheck && (
          <DeleteCheck
            setDeleteCheck={setDeleteCheck}
            id={program.id}
            loadingDelete={loadingDelete}
            setLoadingDelete={setLoadingDelete}
            setUserCustoms={setDisplayCustom}
          />
        )}

        <div className="m-3 flex flex-col justify-between p-2">
          <div className="flex flex-col items-center">
            <div className="flex w-full justify-between">
              <button
                onClick={() => {
                  updateCustomProgram();
                }}
                className="-mt-1 flex rounded-full border border-transparent p-1 text-indigo-900 hover:scale-110 hover:border hover:border-indigo-400 hover:text-indigo-400"
              >
                {pencilBox}
              </button>
              <button
                onClick={() => setDeleteCheck(true)}
                className="-mt-1 flex rounded-full border border-transparent p-1 text-indigo-900 hover:scale-110 hover:border hover:border-pink-400 hover:text-pink-400"
              >
                {xMark}
              </button>
            </div>
            {program.school && (
              <div className="w-3/4 text-center text-2xl font-bold capitalize">
                {program.school}
              </div>
            )}
            {program.name && (
              <div className="w-3/4 text-center text-xl font-bold capitalize">
                {program.name && <div>{program.name}</div>}
              </div>
            )}

            {locationArray && (
              <div className="text-md w-3/4 font-normal capitalize">
                {locationArray.length > 0 && (
                  <div>{locationArray.join(", ")}</div>
                )}
              </div>
            )}
            {program.website && (
              <div className="my-1 break-all italic text-indigo-700 underline md:w-3/4">
                <Link href={program.website} target="blank">
                  {program.website}
                </Link>
              </div>
            )}
            <div className=" mt-1 w-3/4">
              {typesArray.length > 0 && (
                <div>Program Types: {typesArray.join(", ")}</div>
              )}
              {disciplinesArray.length > 0 && (
                <div>Disciplines: {disciplinesArray.join(", ")}</div>
              )}
            </div>
            <div className="mb-3 w-48 border-b-2 border-indigo-700 p-2"></div>
            {patreonInfo && patreonInfo.id ? (
              <NoteDisplay
                noteInput={noteInput}
                program={program}
                setNoteInput={setNoteInput}
                setErrorMessage={setErrorMessage}
                notes={notes}
                setNotes={setNotes}
                type="custom"
              />
            ) : (
              <NotesNoPatreon />
            )}
          </div>
        </div>
        {errorMessage && (
          <div className="fixed left-1/2 top-4 flex -translate-x-1/2 transform items-center border-2 border-pink-700 bg-pink-100 p-2 text-pink-700">
            {cautionCircle}
            <div className="mx-5">{errorMessage}</div>
            {cautionCircle}
          </div>
        )}
      </div>
    );
  }
);

SingleCustom.displayName = "SingleCustom";

export default SingleCustom;
