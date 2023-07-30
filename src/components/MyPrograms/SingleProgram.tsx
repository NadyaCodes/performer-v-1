import React, { useEffect, useState } from "react";
import { ProgramWithInfo } from "../ProgramSearch/types";
import { displayDisciplineText } from "../ProgramSearch/helpers";
import Link from "next/link";
import { Note } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import NoteComponent from "./NoteComponent";

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
      setNoteInput(false);
      setInputText("");
      fetchNotes().then((result) => result && setNotes(result));
      return data;
    },
    onError(error) {
      console.log("createExample error: ", error);
    },
  });

  const addNote = (userId: string, favId: string, text: string) => {
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
      {noteInput ? (
        <button
          className="m-4 w-20 place-self-end rounded p-1 outline"
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
        <div className="flex w-7/12 place-self-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
          <button
            className="mx-5 rounded p-2 outline"
            onClick={() =>
              userId &&
              program.favId &&
              addNote(userId, program.favId, inputText)
            }
          >
            +
          </button>
        </div>
      )}

      <div className="flex flex-col items-center p-2">
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
