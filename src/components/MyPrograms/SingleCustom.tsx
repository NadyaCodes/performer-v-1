import React, { SetStateAction, useEffect, useState, Dispatch } from "react";
import Link from "next/link";
import { CustomProgram, Note } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import NoteComponent from "./NoteComponent";
import {
  cautionCircle,
  chevronUp,
  pencilBox,
  plusIcon,
  trashCan,
  whiteStar,
} from "@component/data/svgs";
import LoadingSpinner from "../Loading/LoadingSpinner";
import LoadingLines from "../Loading/LoadingLines";
import { validateInput } from "./helpers";

const SingleCustom = ({
  program,
  findCustomPrograms,
  setDisplayCustom,
  setShowUpdateCustom,
}: {
  program: CustomProgram;
  findCustomPrograms: Function;
  setDisplayCustom: Dispatch<SetStateAction<CustomProgram[]>>;
  setShowUpdateCustom: Dispatch<SetStateAction<CustomProgram | boolean>>;
}) => {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const userId = sessionData?.user.id;

  const [notes, setNotes] = useState<Note[] | [] | null>(null);
  const [noteInput, setNoteInput] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteCheck, setDeleteCheck] = useState<boolean>(false);

  const fetchNotes = async () => {
    if (program.id) {
      const notesForProgram = await utils.notes.getAllForCustomProgramId.fetch({
        customId: program.id,
      });
      return notesForProgram;
    }
  };

  useEffect(() => {
    fetchNotes().then((result) => result && setNotes(result));
  }, []);

  const { mutate: createNote } = api.notes.add.useMutation({
    async onSuccess(data) {
      await utils.notes.getAll.invalidate();

      setInputText("");
      fetchNotes()
        .then((result) => result && setNotes(result))
        .then(() => setLoadingNotes(false));
      return data;
    },
    onError(error) {
      console.log("createNotes error: ", error);
    },
  });

  const addNote = (userId: string, customId: string, text: string) => {
    const sanitizedText = validateInput(text, setErrorMessage);
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

  const { mutate: deleteCustomProgram } = api.customProgram.delete.useMutation({
    async onSuccess(data) {
      await utils.notes.getAll.invalidate();
      findCustomPrograms().then(
        (customProgramData: CustomProgram[]) =>
          customProgramData && setDisplayCustom(customProgramData)
      );
      return data;
    },
    onError(error) {
      console.log("createNotes error: ", error);
    },
  });

  const deleteProgram = () => {
    setDeleteCheck(false);
    setLoadingDelete(true);
    deleteCustomProgram({ id: program.id });
  };

  const updateCustomProgram = () => {
    window.scrollTo({
      top: 290,
      behavior: "smooth",
    });
    setShowUpdateCustom(program);
  };

  return (
    <div className="relative m-10 flex flex-col shadow-xl">
      <div className="flex justify-between bg-purple-200 text-white">
        <div className="mx-5 my-2">{whiteStar}</div>
        <div className="mx-5 my-2">{whiteStar}</div>
      </div>
      {loadingDelete && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: "rgba(0, 0, 0, 0.7)" }}
        >
          <div className="-translate-y-10">
            <LoadingLines />
          </div>
        </div>
      )}

      {deleteCheck && (
        <>
          <div
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{ background: "rgba(0, 0, 0, 0.4)" }}
          >
            <div className="flex flex-col items-center rounded-lg bg-cyan-50 p-6 text-black">
              <div className="text-2xl font-bold">
                Are you SURE you want to delete this program?
              </div>
              <div className="text-lg italic">
                This process cannot be undone
              </div>
              <div className="mt-4 flex w-full justify-around">
                <button
                  onClick={() => deleteProgram()}
                  className="m-2 flex w-48 justify-between rounded p-3 text-pink-500 outline outline-pink-400 hover:scale-110 hover:shadow-lg"
                >
                  DELETE PROGRAM {trashCan}
                </button>
                <button
                  onClick={() => setDeleteCheck(false)}
                  className="m-2 flex w-48 justify-center rounded p-3 text-cyan-700 outline outline-cyan-500 hover:scale-110 hover:shadow-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="m-3 flex flex-col justify-between p-2">
        <div className="flex flex-col items-center">
          <div className="flex place-self-end">
            <button
              className="mr-8 flex w-48 flex-row justify-between place-self-end rounded border border-yellow-400 bg-transparent px-4 py-2 font-semibold text-yellow-500 shadow-md hover:scale-110 hover:border-transparent hover:bg-yellow-500 hover:text-white"
              onClick={() => {
                updateCustomProgram();
              }}
            >
              <div>Update Program </div>
              <div>{pencilBox}</div>
            </button>
            <button
              className="flex w-48 flex-row justify-between place-self-end rounded border border-red-400 bg-transparent px-4 py-2 font-semibold text-red-400 shadow-md hover:scale-110 hover:border-transparent hover:bg-red-600 hover:text-white"
              onClick={() => setDeleteCheck(true)}
            >
              <div>Delete Program </div>
              <div>{trashCan}</div>
            </button>
          </div>
          <div className="text-2xl font-bold capitalize">
            {program.name && <div>{program.name}</div>}
          </div>
          {program.school && (
            <div className="text-xl font-bold capitalize">{program.school}</div>
          )}
          <div className="text-md font-normal capitalize">
            {locationArray.length > 0 && <div>{locationArray.join(", ")}</div>}
          </div>
          {program.website && (
            <div className="italic">
              <Link href={program.website} target="blank">
                {program.website}
              </Link>
            </div>
          )}
          <div>
            {typesArray.length > 0 && (
              <div>Program Types: {typesArray.join(", ")}</div>
            )}
            {disciplinesArray.length > 0 && (
              <div>Disciplines: {disciplinesArray.join(", ")}</div>
            )}
          </div>
          <div className="mb-3 w-48 border-b-2 border-cyan-500 p-2"></div>
          {notesDisplay && notesDisplay.length > 0 && (
            <div className="m-2 flex w-full content-center justify-center">
              <ul className="w-6/12">{notesDisplay}</ul>
            </div>
          )}
          {notesDisplay && notesDisplay.length === 0 && (
            <div className="italic">No Notes</div>
          )}
          {noteInput && (
            <button
              className="m-2 flex w-40 justify-between rounded border border-cyan-500 bg-transparent px-4 py-2 font-semibold text-cyan-600 hover:border-transparent hover:bg-cyan-500 hover:text-white"
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
              className="m-2 flex w-32 place-items-center justify-between rounded border border-cyan-500 bg-transparent px-4 py-2 font-semibold text-cyan-600 hover:border-transparent hover:bg-cyan-500 hover:text-white"
              onClick={() => setNoteInput(true)}
            >
              <span>Add Note</span>
              <span>{plusIcon}</span>
            </button>
          )}
          {loadingNotes && (
            <div className="mt-7">
              <LoadingSpinner iconSize="medium" />
            </div>
          )}
          {noteInput && (
            <div className="flex w-7/12 place-items-center place-self-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <button
                className=" p-.5 ml-5 h-fit rounded  text-purple-600 outline hover:scale-110"
                onClick={() =>
                  userId && program.id && addNote(userId, program.id, inputText)
                }
              >
                {plusIcon}
              </button>
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
};

export default SingleCustom;
