import React, { SetStateAction, Dispatch } from "react";
import { trashCan } from "@component/data/svgs";
import LoadingLines from "../Loading/LoadingLines";
import { api } from "@component/utils/api";
import { ProgramWithType } from "./MyProgramsComponent";
import { FTProgram, PTProgram } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function DeleteCheck({
  setDeleteCheck,
  id,
  loadingDelete,
  setUserFavs,
  setLoadingDelete,
}: {
  setDeleteCheck: Dispatch<SetStateAction<boolean>>;
  id: string;
  loadingDelete: boolean | string;
  setUserFavs: Dispatch<SetStateAction<(ProgramWithType | undefined)[] | null>>;
  setLoadingDelete: Dispatch<SetStateAction<boolean | string>>;
}) {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const userId = sessionData?.user.id;

  const findProgramObject = async (id: string) => {
    if (userId) {
      const ptProgramObject = await utils.ptProgram.getOneById.fetch({ id });
      const ftProgramObject = await utils.ftProgram.getOneById.fetch({ id });
      if (ftProgramObject) {
        return ftProgramObject;
      }
      if (ptProgramObject) {
        return ptProgramObject;
      }
    }
  };

  const findUserFavs = async (userId: string) => {
    const allUserFavs = utils.favs.getAllForUser.fetch({ userId });
    const userFavPrograms: (ProgramWithType | undefined)[] = await Promise.all(
      (
        await allUserFavs
      ).map(async (element) => {
        if (element.ftProgramId) {
          const program = (await findProgramObject(
            element.ftProgramId
          )) as FTProgram;
          return (
            { ...program, type: "ft", favProgramId: element.id } || undefined
          );
        }
        if (element.ptProgramId) {
          const program = (await findProgramObject(
            element.ptProgramId
          )) as PTProgram;
          return (
            { ...program, type: "pt", favProgramId: element.id } || undefined
          );
        }
        return undefined;
      })
    );
    return userFavPrograms;
  };

  const { mutate: deleteFav } = api.favs.deleteById.useMutation({
    async onSuccess(data) {
      await utils.favs.getAll.invalidate();
      userId &&
        findUserFavs(userId).then(
          (favProgramData: (ProgramWithType | undefined)[]) =>
            favProgramData && setUserFavs(favProgramData)
        );
      return data;
    },
    onError(error) {
      console.log("deleteFav error: ", error);
    },
  });

  const deleteProgram = () => {
    setLoadingDelete(id);
    setDeleteCheck(false);
    deleteFav({ id });
  };

  return (
    <>
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
      >
        <div className="flex flex-col items-center rounded-lg bg-cyan-50 p-6 text-black">
          <div className="text-2xl font-bold">
            Are you SURE you want to delete this program?
          </div>
          <div className="text-lg italic">This process cannot be undone</div>
          <div className="mt-4 flex w-full justify-around">
            <button
              onClick={() => {
                deleteProgram();
              }}
              className="m-2 flex w-48 justify-between rounded p-3 text-pink-500 outline outline-pink-400 hover:scale-110 hover:shadow-lg"
            >
              DELETE PROGRAM {trashCan}
            </button>
            <button
              onClick={() => setDeleteCheck(false)}
              className="m-2 flex w-48 justify-center rounded p-3 text-cyan-700 outline outline-cyan-500 hover:scale-110 hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {loadingDelete && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: "rgba(0, 0, 0, 0.7)" }}
        >
          <div className="-translate-y-10">
            <LoadingLines />
          </div>
        </div>
      )}
    </>
  );
}
