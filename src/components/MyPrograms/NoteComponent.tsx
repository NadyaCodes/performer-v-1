import { Note } from "@prisma/client";
import React, { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { api } from "@component/utils/api";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { trashCan } from "@component/data/svgs";

export default function NoteComponent({
  note,
  setNotes,
  fetchNotes,
}: {
  note: Note;
  setNotes: Dispatch<SetStateAction<Note[] | [] | null>>;
  fetchNotes: Function;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
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
        <li className="text-end">{note.text}</li>
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
          {loading ? <LoadingSpinner iconSize="small" /> : trashCan}
        </button>
      </div>
    </div>
  );
}
