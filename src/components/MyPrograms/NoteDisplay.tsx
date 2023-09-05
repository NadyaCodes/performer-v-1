import React, { useState } from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { chevronUp } from "@component/data/svgs";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import { useEffectOnce } from "../AddProgramResult/helpers";
import type { CustomProgram, Note } from "@prisma/client";
import { validateNote } from "./helpers";
import NoteComponent from "./NoteComponent";
import { plusIcon } from "@component/data/svgs";
import type { ProgramWithInfo } from "../ProgramFinder/types";

export type NoteDisplayProps = {
  noteInput: boolean;
  program: ProgramWithInfo | CustomProgram;
  setNoteInput: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  notes: { [key: string]: Note[] } | [] | null;
  setNotes: React.Dispatch<
    React.SetStateAction<{ [key: string]: Note[] } | null | []>
  >;
  type: string;
};

const NoteDisplay: React.FC<NoteDisplayProps> = ({
  noteInput,
  program,
  setNoteInput,
  setErrorMessage,
  notes,
  setNotes,
  type,
}) => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const utils = api.useContext();

  const [inputText, setInputText] = useState<string>("");
  const [loadingNotes, setLoadingNotes] = useState<boolean>(false);

  const fetchNotesFavs = async () => {
    if ("favId" in program && program.favId) {
      const notesForProgram = await utils.notes.getAllForFavProgramId.fetch({
        favId: program.favId,
      });
      return notesForProgram;
    }
  };

  const fetchNotesCustom = async () => {
    if (program.id) {
      const notesForProgram = await utils.notes.getAllForCustomProgramId.fetch({
        customId: program.id,
      });
      return notesForProgram;
    }
  };

  const fetchAllNotes = () => {
    if (type === "fav" && "favId" in program && program && program.favId) {
      fetchNotesFavs()
        .then(
          (result) =>
            result &&
            setNotes((prevNotes) => ({
              ...prevNotes,
              [(program as { favId: string }).favId]: result,
            }))
        )
        .then(() => setLoadingNotes(false))
        .catch((error) => console.error("Error fetching notes: ", error));
    } else if (type === "custom" && program && program.id) {
      fetchNotesCustom()
        .then(
          (result) =>
            result &&
            setNotes((prevNotes) => ({
              ...prevNotes,
              [(program as { id: string }).id]: result,
            }))
        )
        .then(() => setLoadingNotes(false))
        .catch((error) => console.error("Error fetching notes: ", error));
    }
  };

  useEffectOnce(() => {
    fetchAllNotes();
  });

  const { mutate: createNote } = api.notes.add.useMutation({
    async onSuccess(data) {
      await utils.notes.getAll.invalidate();

      setInputText("");
      fetchAllNotes();
      return data;
    },
    onError(error) {
      console.log("createExample error: ", error);
    },
  });

  const addNoteFav = (userId: string, favId: string, text: string) => {
    const sanitizedText = validateNote(text, setErrorMessage);
    if (sanitizedText) {
      setLoadingNotes(true);
      setNoteInput(false);
      return createNote({ userId, favId, text: sanitizedText });
    }
  };

  const addNoteCustom = (userId: string, customId: string, text: string) => {
    const sanitizedText = validateNote(text, setErrorMessage);
    if (sanitizedText) {
      setLoadingNotes(true);
      setNoteInput(false);
      return createNote({ userId, customId, text: sanitizedText });
    }
  };

  const notesKey =
    (program as ProgramWithInfo)?.favId || (program as CustomProgram)?.id || "";

  const notesArray = notes
    ? (notes as { [key: string]: Note[] })[notesKey]
    : null;

  const notesDisplay = notesArray?.map((note) => (
    <NoteComponent
      note={note}
      setNotes={setNotes}
      fetchNotes={type === "fav" ? fetchNotesFavs : fetchNotesCustom}
      key={note.id}
      notesKey={notesKey}
    />
  ));

  const handleAddNote = () => {
    if (userId) {
      if (type === "fav" && "favId" in program && program.favId) {
        addNoteFav(userId, program.favId, inputText);
      } else if (type === "custom") {
        addNoteCustom(userId, program.id, inputText);
      }
    }
  };

  const noteButtonColor = type === "fav" ? "text-cyan-600" : "text-indigo-800";
  const noteHoverColor = type === "fav" ? "bg-cyan-800" : "bg-indigo-800";

  return (
    <div className="flex w-full flex-col items-center">
      {notesDisplay && notesDisplay.length > 0 && (
        <div className="m-2 flex w-11/12 content-center justify-center mobileMenu:w-7/12">
          <ul className=" w-full">{notesDisplay}</ul>
        </div>
      )}
      {notesDisplay && notesDisplay.length === 0 && (
        <div className="w-full text-center italic">No Notes</div>
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
          className="m-2 flex w-40 justify-between rounded bg-transparent px-4 py-2 font-semibold text-cyan-600 hover:bg-indigo-300 hover:text-indigo-900 hover:shadow-md hover:shadow-indigo-200"
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
          className={`m-2 flex w-40 place-items-center justify-between rounded bg-transparent px-4 py-2 font-semibold ${noteButtonColor} transition-all hover:${noteHoverColor} hover:text-cyan-50 hover:shadow-md hover:shadow-cyan-900`}
          onClick={() => setNoteInput(true)}
        >
          <span>Add Note</span>
          <span>{plusIcon}</span>
        </button>
      )}
      {loadingNotes && (
        <div className="mt-7 text-cyan-700">
          <LoadingSpinner iconSize="medium" />
        </div>
      )}

      {noteInput && (
        <div
          style={{
            animation: "pullDown 0.2s ease-out",
            transformOrigin: "50% 0%",
          }}
          className="flex w-11/12 place-items-center place-self-center mobileMenu:m-3 mobileMenu:w-7/12"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="block w-full rounded-lg border border-indigo-200 bg-cyan-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:outline-cyan-500 focus:ring-cyan-500"
          />
          <button
            className=" p-.5 ml-2 h-fit rounded text-cyan-600  outline hover:scale-110 mobileMenu:ml-5"
            onClick={() => handleAddNote()}
          >
            {plusIcon}
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteDisplay;
