import React, {
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
  // forwardRef,
  // Ref,
} from "react";
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
  basicStar,
  xMark,
} from "@component/data/svgs";
import LoadingSpinner from "../Loading/LoadingSpinner";
import LoadingLines from "../Loading/LoadingLines";
import { validateInput } from "./helpers";
import DeleteCheck from "./DeleteCheck";

const SingleCustom = ({
  program,
  setDisplayCustom,
  setShowUpdateCustom,
  loadingDelete,
  setLoadingDelete,
}: {
  program: CustomProgram;
  setDisplayCustom: Dispatch<SetStateAction<CustomProgram[]>>;
  setShowUpdateCustom: Dispatch<SetStateAction<CustomProgram | boolean>>;
  loadingDelete: string | boolean;
  setLoadingDelete: Dispatch<SetStateAction<string | boolean>>;
}) => {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const userId = sessionData?.user.id;

  const [notes, setNotes] = useState<Note[] | [] | null>(null);
  const [noteInput, setNoteInput] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
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

  const updateCustomProgram = () => {
    window.scrollTo({
      top: 290,
      behavior: "smooth",
    });
    setShowUpdateCustom(program);
  };

  return (
    <div
      className="relative my-10 flex w-full flex-col rounded-lg bg-cyan-100 bg-opacity-20 opacity-0 shadow-md shadow-cyan-800"
      style={{ animation: "fadeInGrow 1s linear 3s forwards" }}
      // ref={ref}
      id={program.id}
    >
      <div className="flex w-full justify-between rounded-t-lg bg-cyan-800 bg-opacity-100 text-cyan-50 shadow-sm shadow-cyan-900">
        <div className="mx-5 my-2">{basicStar}</div>
        <div className="mx-5 my-2">{basicStar}</div>
      </div>
      {loadingDelete === program.id && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-lg"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <div className="-translate-y-10">
            <LoadingLines />
          </div>
        </div>
      )}

      {deleteCheck && (
        <DeleteCheck
          setDeleteCheck={setDeleteCheck}
          id={program.id}
          loadingDelete={loadingDelete}
          setLoadingDelete={setLoadingDelete}
          setUserCustoms={setDisplayCustom}
        />
      )}

      <div className="m-3 flex flex-col justify-between p-2">
        <div className="flex flex-col items-center">
          <div className="flex place-self-end">
            <button
              onClick={() => {
                updateCustomProgram();
              }}
              className="absolute right-16 -mt-1 flex rounded-full border border-transparent p-1 text-cyan-900 hover:scale-110 hover:border hover:border-indigo-400 hover:text-indigo-400"
            >
              {pencilBox}
            </button>
            <button
              onClick={() => setDeleteCheck(true)}
              className="absolute right-4 -mt-1 flex rounded-full border border-transparent p-1 text-cyan-900 hover:scale-110 hover:border hover:border-pink-400 hover:text-pink-400"
            >
              {xMark}
            </button>
          </div>
          {program.school && (
            <div className="text-2xl font-bold capitalize">
              {program.school}
            </div>
          )}
          {program.name && (
            <div className="text-xl font-bold capitalize">
              {program.name && <div>{program.name}</div>}
            </div>
          )}

          {locationArray && (
            <div className="text-md font-normal capitalize">
              {locationArray.length > 0 && (
                <div>{locationArray.join(", ")}</div>
              )}
            </div>
          )}
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
                  userId && program.id && addNote(userId, program.id, inputText)
                }
              >
                {plusIcon}
              </button>
            </div>
          )}
          {loadingNotes && (
            <div className="mt-7">
              <LoadingSpinner iconSize="medium" />
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
