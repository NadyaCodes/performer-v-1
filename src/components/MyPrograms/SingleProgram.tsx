import React, {
  type SetStateAction,
  useEffect,
  useState,
  type Dispatch,
} from "react";
import type { ProgramWithInfo } from "../ProgramFinder/types";
import { displayDisciplineText } from "../ProgramFinder/helpers";
import Link from "next/link";
import type { Note } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import NoteComponent from "./NoteComponent";
import {
  basicStar,
  cautionCircle,
  chevronUp,
  plusIcon,
  shareIcon,
  xMark,
} from "@component/data/svgs";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { validateNote } from "./helpers";
import DeleteCheck from "./DeleteCheck";
import type { ProgramWithType } from "./MyProgramsComponent";
import LoadingLines from "../Loading/LoadingLines";
import ShareOptions from "../ProgramFinder/ShareOptions";

const SingleProgram = ({
  program,
  loadingDelete,
  setLoadingDelete,
  setUserFavs,
}: {
  program: ProgramWithInfo;
  loadingDelete: boolean | string;
  setLoadingDelete: Dispatch<SetStateAction<boolean | string>>;
  findUserFavs: Function;
  setUserFavs: Dispatch<SetStateAction<(ProgramWithType | undefined)[] | null>>;
}) => {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const userId = sessionData?.user.id;

  const [notes, setNotes] = useState<Note[] | [] | null>(null);
  const [noteInput, setNoteInput] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [removeComponent, setRemoveComponent] = useState<boolean>(false);
  const [share, setShare] = useState(false);

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
    const sanitizedText = validateNote(text, setErrorMessage);
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
    <div
      className="relative my-12 flex w-full flex-col rounded-lg bg-cyan-100 bg-opacity-20 text-center shadow-md shadow-cyan-800"
      style={{ animation: "pullDownTop 1s linear" }}
      id={program.id}
    >
      <div
        className="flex w-full justify-between rounded-t-lg bg-cyan-800 bg-opacity-100 text-cyan-50 opacity-0 shadow-sm shadow-cyan-900"
        style={{ animation: "fadeIn 0.5s linear forwards" }}
      >
        <div className="mx-5 my-2">{basicStar}</div>
        <div className="mx-5 my-2">{basicStar}</div>
      </div>
      <button
        onClick={() => setRemoveComponent(true)}
        className="absolute right-4 mt-12 flex rounded-full border border-transparent p-0.5 text-cyan-900 hover:scale-110 hover:border hover:border-pink-400 hover:text-pink-400"
      >
        {xMark}
      </button>
      {removeComponent && program.favId && (
        <DeleteCheck
          setDeleteCheck={setRemoveComponent}
          id={program.favId}
          loadingDelete={loadingDelete}
          setUserFavs={setUserFavs}
          setLoadingDelete={setLoadingDelete}
          programId={program.id}
        />
      )}
      <div className="hidden h-0 translate-x-20 place-self-end mobileMenu:block">
        {share && <ShareOptions program={program} setShare={setShare} />}
      </div>

      <div className="my-1 flex flex-col items-center text-cyan-950 mobileMenu:p-2">
        <div className="m-2 mt-6 text-2xl font-bold capitalize">
          {program.schoolObj?.name}
        </div>
        <div className="text-xl font-bold capitalize">
          {"name" in program && program.name && <div>{program.name}</div>}
        </div>
        <div className="text-md font-normal capitalize">
          {program.cityObj?.city}, {program.cityObj?.province}
        </div>

        <div className="m-1 break-all italic text-cyan-600 underline">
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
            className="m-2 flex w-40 place-items-center justify-between rounded bg-transparent px-4 py-2 font-semibold text-cyan-600 transition-all hover:bg-cyan-800 hover:text-cyan-50 hover:shadow-md hover:shadow-cyan-900"
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
      {loadingDelete === program.id && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center rounded-lg"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <div className="-translate-y-10">
            <LoadingLines />
          </div>
        </div>
      )}
      {!noteInput && (
        <div
          className="mb-5 mr-5 scale-110 place-self-end text-cyan-700 hover:scale-150"
          onClick={() => setShare(!share)}
        >
          {shareIcon}
        </div>
      )}
      <div className="h-0 place-self-end mobileMenu:hidden">
        {share && <ShareOptions program={program} setShare={setShare} />}
      </div>
    </div>
  );
};

export default SingleProgram;
