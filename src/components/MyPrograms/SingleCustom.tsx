import React, { SetStateAction, useEffect, useState, Dispatch } from "react";
import Link from "next/link";
import { CustomProgram, Note } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import NoteComponent from "./NoteComponent";
import {
  cautionCircle,
  pencilBox,
  plusIcon,
  purpleStar,
  trashCan,
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
    <div className="relative overflow-hidden">
      <div className="m-10 flex flex-col border-2 border-purple-200">
        {loadingDelete && (
          <div
            className="absolute inset-0 z-10 m-10 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 100%)",
            }}
          >
            <div className="-translate-y-10">
              <LoadingLines />
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <div className="mx-5 my-2">{purpleStar}</div>
          {loadingNotes && (
            <div className="mt-7">
              <LoadingSpinner iconSize="medium" />
            </div>
          )}
          {errorMessage && (
            <div className="absolute left-1/2 m-2 flex -translate-x-1/2 transform flex-row items-center bg-pink-100 p-2 text-pink-700">
              {cautionCircle}
              <div className="mx-5">{errorMessage}</div>
              {cautionCircle}
            </div>
          )}
          <div className="mx-5 my-2">{purpleStar}</div>
        </div>

        {noteInput ? (
          <button
            className="mr-4 flex place-self-end rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-600 hover:border-transparent hover:bg-blue-500 hover:text-white"
            onClick={() => {
              setNoteInput(false);
              setInputText("");
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            className="mr-4 flex place-self-end rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-600 hover:border-transparent hover:bg-blue-500 hover:text-white"
            onClick={() => setNoteInput(true)}
          >
            Add Note
          </button>
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

        <div className="flex flex-col items-center p-2">
          <div className="text-xl font-bold capitalize">
            {program.name && <div>{program.name}</div>}
          </div>
          {program.school && (
            <div className="text-lg font-bold capitalize">{program.school}</div>
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
          <div className="w-48 border-b-2 border-cyan-500 p-2"></div>
          {notesDisplay && notesDisplay.length > 0 ? (
            <div className="flex w-full content-center justify-center">
              <ul className="w-6/12">{notesDisplay}</ul>
            </div>
          ) : (
            <div>No Notes</div>
          )}
        </div>
        <button
          className=" m-4 flex w-48 flex-row justify-between place-self-end rounded border border-yellow-400 bg-transparent px-4 py-2 font-semibold text-yellow-500 hover:border-transparent hover:bg-yellow-500 hover:text-white"
          onClick={() => {
            updateCustomProgram();
          }}
        >
          <div>Update Program </div>
          <div>{pencilBox}</div>
        </button>
        <button
          className=" m-4 flex w-48 flex-row justify-between place-self-end rounded border border-red-400 bg-transparent px-4 py-2 font-semibold text-red-400 hover:border-transparent hover:bg-red-600 hover:text-white"
          onClick={() => {
            deleteProgram();
          }}
        >
          <div>Delete Program </div>
          <div>{trashCan}</div>
        </button>
      </div>
    </div>
  );
};

export default SingleCustom;
