import { Note } from "@prisma/client";
import React, { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { api } from "@component/utils/api";
import LoadingSpinner from "../Loading/LoadingSpinner";

export default function NoteComponent({
  note,
  setNotes,
  fetchNotes,
}: {
  note: Note;
  setNotes: Dispatch<SetStateAction<Note[] | [] | null>>;
  fetchNotes: Function;
}) {
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const utils = api.useContext();
  const { mutate: deleteNote } = api.notes.deleteById.useMutation({
    async onSuccess(data) {
      await utils.notes.getAll.invalidate();
      fetchNotes()
        .then((result: Note[]) => result && setNotes(result))
        .then(() => setLoading(false));
      return data;
    },
    onError(error) {
      console.log("createExample error: ", error);
    },
  });

  const removeNote = (id: string) => {
    setLoading(true);
    return deleteNote({ id });
  };

  return (
    <div className={hover ? "m-3 bg-pink-100 px-2" : "m-3 px-2"}>
      <div className="m-2 flex w-full place-items-center justify-end p-1">
        <li className="">{note.text}</li>
        <button
          className={
            hover
              ? " ml-3 h-8 w-10 scale-125 rounded px-2 text-pink-400"
              : "ml-3 h-8 w-10 rounded px-2 text-pink-200"
          }
          onClick={() => removeNote(note.id)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {loading ? (
            <LoadingSpinner iconSize="small" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.3}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
