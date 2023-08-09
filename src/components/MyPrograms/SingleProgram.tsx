import React, { useEffect, useState } from "react";
import { ProgramWithInfo } from "../ProgramFinder/types";
import { displayDisciplineText } from "../ProgramFinder/helpers";
import Link from "next/link";
import { Note } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import NoteComponent from "./NoteComponent";
import {
  basicStar,
  cautionCircle,
  chevronUp,
  plusIcon,
  purpleStar,
  whiteStar,
} from "@component/data/svgs";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { validateInput } from "./helpers";

type SingleProgramProps = {
  program: ProgramWithInfo;
};

const SingleProgram: React.FC<SingleProgramProps> = ({ program }) => {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const userId = sessionData?.user.id;

  const [notes, setNotes] = useState<Note[] | [] | null>(null);
  const [noteInput, setNoteInput] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchNotes = async () => {
    if (program.favId) {
      const notesForProgram = await utils.notes.getAllForFavProgramId.fetch({
        favId: program.favId,
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
      console.log("createExample error: ", error);
    },
  });

  const addNote = (userId: string, favId: string, text: string) => {
    const sanitizedText = validateInput(text, setErrorMessage);
    if (sanitizedText) {
      setLoadingNotes(true);
      setNoteInput(false);
      return createNote({ userId, favId, text: sanitizedText });
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

  return (
    <div className="m-10 flex flex-col shadow-xl">
      <div className="flex justify-between bg-purple-200 text-white">
        <div className="mx-5 my-2">{whiteStar}</div>
        <div className="mx-5 my-2">{whiteStar}</div>
      </div>

      <div className="m-3 flex flex-col items-center p-2">
        <div className="text-2xl font-bold capitalize">
          {"name" in program && program.name && <div>{program.name}</div>}
        </div>
        <div className="text-xl font-bold capitalize">
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
          {displayDisciplineText(program.discipline)}
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
          <div
            style={{
              animation: "pullDown 0.2s ease-out",
              transformOrigin: "50% 0%",
            }}
            className="m-3 flex w-7/12 place-items-center place-self-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
            />
            <button
              className=" p-.5 ml-5 h-fit rounded  text-cyan-600 outline hover:scale-110"
              onClick={() =>
                userId &&
                program.favId &&
                addNote(userId, program.favId, inputText)
              }
            >
              {plusIcon}
            </button>
          </div>
        )}
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

export default SingleProgram;
