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
    <div className="my-10 flex w-full flex-col rounded-lg bg-cyan-100 bg-opacity-20 shadow-md shadow-cyan-800">
      <div className="flex w-full justify-between rounded-t-lg bg-cyan-800 bg-opacity-100 text-cyan-50 shadow-sm shadow-cyan-900">
        <div className="mx-5 my-2">{basicStar}</div>
        <div className="mx-5 my-2">{basicStar}</div>
      </div>

      <div className="m-3 flex flex-col items-center p-2 text-cyan-950">
        <div className="text-2xl font-bold capitalize">
          {"name" in program && program.name && <div>{program.name}</div>}
        </div>
        <div className="text-xl font-bold capitalize">
          {program.schoolObj?.name}
        </div>
        <div className="text-md font-normal capitalize">
          {program.cityObj?.city}, {program.cityObj?.province}
        </div>

        <div className="italic text-cyan-600 underline">
          <Link href={program.website} target="blank">
            {program.website}
          </Link>
        </div>
        <div>
          {program.type === "ft" ? "Full Time " : "Part Time "}{" "}
          {displayDisciplineText(program.discipline)}
        </div>
        <div className="mb-3 w-48 border-b-2 border-cyan-600 p-2"></div>

        {notesDisplay && notesDisplay.length > 0 && (
          <div className="m-2 flex w-7/12 content-center justify-center">
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
            className="m-2 flex w-32 place-items-center justify-between rounded bg-transparent px-4 py-2 font-semibold text-cyan-600 transition-all hover:bg-cyan-800 hover:text-cyan-50 hover:shadow-md hover:shadow-cyan-900"
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
              className="block w-full rounded-lg border border-indigo-200 bg-cyan-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:outline-cyan-500 focus:ring-cyan-500"
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
