import React, { useState } from "react";
import Link from "next/link";
import type { CustomProgram, Note } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import NoteComponent from "./NoteComponent";
import {
  cautionCircle,
  chevronUp,
  pencilBox,
  plusIcon,
  basicStar,
  xMark,
} from "@component/data/svgs";
import LoadingSpinner from "../Loading/LoadingSpinner";
import LoadingLines from "../Loading/LoadingLines";
import { validateNote } from "./helpers";
import DeleteCheck from "./DeleteCheck";
import { useEffectOnce } from "../AddProgramResult/helpers";

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
}

const SingleCustom = React.forwardRef<HTMLDivElement, SingleCustomProps>(
  (
    {
      program,
      setDisplayCustom,
      setShowUpdateCustom,
      loadingDelete,
      setLoadingDelete,
    },
    ref
  ) => {
    const { data: sessionData } = useSession();
    const utils = api.useContext();
    const userId = sessionData?.user.id;

    const [notes, setNotes] = useState<Note[] | [] | null>(null);
    const [noteInput, setNoteInput] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");
    const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [deleteCheck, setDeleteCheck] = useState<boolean>(false);

    const fetchNotes = async () => {
      if (program.id) {
        const notesForProgram =
          await utils.notes.getAllForCustomProgramId.fetch({
            customId: program.id,
          });
        return notesForProgram;
      }
    };

    useEffectOnce(() => {
      fetchNotes()
        .then((result) => result && setNotes(result))
        .catch((error) => console.error("Error fetching notes: ", error));
    });

    const { mutate: createNote } = api.notes.add.useMutation({
      async onSuccess(data) {
        await utils.notes.getAll.invalidate();

        setInputText("");
        fetchNotes()
          .then((result) => result && setNotes(result))
          .then(() => setLoadingNotes(false))
          .catch((error) => console.error("Error fetching notes: ", error));
        return data;
      },
      onError(error) {
        console.log("createNotes error: ", error);
      },
    });

    const addNote = (userId: string, customId: string, text: string) => {
      const sanitizedText = validateNote(text, setErrorMessage);
      if (sanitizedText) {
        setLoadingNotes(true);
        setNoteInput(false);
        return createNote({ userId, customId, text: sanitizedText });
      }
    };

    const notesDisplay = notes?.map((note) => {
      return (
        <NoteComponent
          note={note}
          setNotes={setNotes}
          fetchNotes={fetchNotes}
          key={note.id}
        />
      );
    });

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
        style={{ animation: "pullDownTop 1s linear" }}
        id={program.id}
        ref={ref}
      >
        <div
          className="flex w-full justify-between rounded-t-lg bg-indigo-900 bg-opacity-100 text-indigo-50 shadow-sm shadow-indigo-900"
          style={{ animation: "fadeIn 0.5s linear forwards" }}
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
            {notesDisplay && notesDisplay.length > 0 && (
              <div className="m-2 flex w-11/12 content-center justify-center mobileMenu:w-7/12">
                <ul className=" w-full">{notesDisplay}</ul>
              </div>
            )}
            {notesDisplay && notesDisplay.length === 0 && (
              <div className="mb-2 w-full text-center italic">No Notes</div>
            )}
            {!notesDisplay && (
              <div className="flex flex-col items-center">
                <span>
                  <LoadingSpinner iconSize="medium" />
                </span>
                <span>Loading Notes</span>
              </div>
            )}
            {noteInput && (
              <button
                className="m-2 flex w-40 justify-between rounded bg-transparent px-4 py-2 font-semibold text-indigo-700 hover:bg-cyan-700 hover:text-cyan-50 hover:shadow-md hover:shadow-cyan-800"
                onClick={() => {
                  setNoteInput(false);
                  setInputText("");
                }}
              >
                <span>{chevronUp}</span>
                <span>Cancel</span>
                <span>{chevronUp}</span>
              </button>
            )}
            {!noteInput && !loadingNotes && (
              <button
                className="m-2 flex w-40 place-items-center justify-between rounded bg-transparent px-4 py-2 font-semibold text-indigo-700 transition-all hover:bg-indigo-800 hover:text-indigo-50 hover:shadow-md hover:shadow-indigo-900"
                onClick={() => setNoteInput(true)}
              >
                <span>Add Note</span>
                <span>{plusIcon}</span>
              </button>
            )}
            {noteInput && (
              <div
                style={{
                  animation: "pullDown 0.2s ease-out",
                  transformOrigin: "50% 0%",
                }}
                className="flex w-full place-items-center place-self-center mobileMenu:m-3 mobileMenu:w-7/12"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="block w-full rounded-lg border border-indigo-200 bg-indigo-100 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:outline-indigo-600 focus:ring-indigo-600"
                />
                <button
                  className=" p-.5 ml-2 h-fit rounded text-indigo-700  outline hover:scale-110 mobileMenu:ml-5"
                  onClick={() =>
                    userId &&
                    program.id &&
                    addNote(userId, program.id, inputText)
                  }
                >
                  {plusIcon}
                </button>
              </div>
            )}
            {loadingNotes && (
              <div className="mt-7 text-indigo-800">
                <LoadingSpinner iconSize="medium" />
              </div>
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
