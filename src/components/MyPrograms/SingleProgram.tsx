import React, { useEffect, useState } from "react";
import { ProgramWithInfo } from "../ProgramSearch/types";
import { displayDisciplineText } from "../ProgramSearch/helpers";
import Link from "next/link";
import { Note } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import NoteComponent from "./NoteComponent";
import { plusIcon, purpleStar } from "@component/data/svgs";
import LoadingLines from "../Loading/LoadingLines";
import LoadingSpinner from "../Loading/LoadingSpinner";

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
    setLoadingNotes(true);
    setNoteInput(false);
    return createNote({ userId, favId, text });
  };

  const notesDisplay = notes?.map((note) => {
    return (
      <NoteComponent note={note} setNotes={setNotes} fetchNotes={fetchNotes} />
    );
  });

  return (
    <div className="m-10 flex flex-col border-2 border-purple-200">
      <div className="flex justify-between">
        <div className="mx-5 my-2">{purpleStar}</div>
        {loadingNotes && (
          <div className="mt-7">
            <LoadingSpinner iconSize="medium" />
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
              userId &&
              program.favId &&
              addNote(userId, program.favId, inputText)
            }
          >
            {plusIcon}
          </button>
        </div>
      )}

      <div className="flex flex-col items-center p-2">
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
          {displayDisciplineText(program.discipline)}
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
    </div>
  );
};

export default SingleProgram;
