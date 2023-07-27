import React, { SetStateAction, useState } from "react";
import { ProgramWithInfo } from "./types";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import { FavProgram } from "@prisma/client";
import { Dispatch } from "react";

import { displayDisciplineText } from "./helpers";

export default function ProgramItem({
  element,
  fav,
  findUserFavs,
  setUserFavs,
}: {
  element: ProgramWithInfo;
  fav: boolean;
  findUserFavs: Function;
  setUserFavs: Dispatch<SetStateAction<string[] | null>>;
}) {
  const { data: sessionData } = useSession();
  const utils = api.useContext();

  const userId = sessionData?.user.id;
  const type = element.type;

  const [animateStar, setAnimateStar] = useState(false);
  const starAnimation = animateStar
    ? "rotateSwell .8s linear infinite"
    : "none";

  const findFav = async (
    type: string,
    userId: string | undefined,
    programId: string
  ): Promise<FavProgram | null> => {
    if (userId) {
      if (type === "pt") {
        const programObject = await utils.favs.getOnePT.fetch({
          userId,
          ptProgramId: programId,
        });
        return programObject;
      }
      if (type === "ft") {
        const programObject = await utils.favs.getOneFT.fetch({
          userId,
          ftProgramId: programId,
        });
        return programObject;
      }
    }
    return null;
  };

  const { mutate: addFavPt } = api.favs.addPT.useMutation({
    async onSuccess(data) {
      findUserFavs(userId)
        .then((result: string[] | undefined) =>
          result
            ? setUserFavs(result.filter((fav) => fav !== undefined) as string[])
            : setUserFavs([])
        )
        .then(() => setAnimateStar(false));
      return data;
    },
    onError(error) {
      console.log("addFavPt error: ", error);
    },
  });

  const { mutate: addFavFt } = api.favs.addFT.useMutation({
    async onSuccess(data) {
      findUserFavs(userId)
        .then((result: string[] | undefined) =>
          result
            ? setUserFavs(result.filter((fav) => fav !== undefined) as string[])
            : setUserFavs([])
        )
        .then(() => setAnimateStar(false));
      return data;
    },
    onError(error) {
      console.log("addFavFt error: ", error);
    },
  });

  const { mutate: deleteFav } = api.favs.deleteById.useMutation({
    async onSuccess(data) {
      findUserFavs(userId)
        .then((result: string[] | undefined) =>
          result
            ? setUserFavs(result.filter((fav) => fav !== undefined) as string[])
            : setUserFavs([])
        )
        .then(() => setAnimateStar(false));
    },
    onError(error) {
      console.log("deleteFav error: ", error);
    },
  });

  const toggleFav = async () => {
    if (userId) {
      setAnimateStar(true);
      if (fav) {
        const favProgramId = element.id;
        const favProgram = await findFav(type, userId, favProgramId);
        favProgram && deleteFav({ id: favProgram.id });
      } else {
        type === "pt" && addFavPt({ userId, ptProgramId: element.id });
        type === "ft" && addFavFt({ userId, ftProgramId: element.id });
      }
    }
  };

  return (
    <div className="m-10 flex flex-col border-2 border-purple-200">
      {sessionData?.user && (
        <div className="mx-5 my-2 place-self-end">
          <div
            style={{
              animation: starAnimation,
              transition: "transform 2s ease",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={fav ? "#c084fc" : "none"}
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="#c084fc"
              className="h-6 w-6"
              onClick={() => toggleFav()}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="text-sm italic">{element.id}</div>
        <div className="text-xl font-bold capitalize">
          {"name" in element && element.name && <div>{element.name}</div>}
        </div>
        <div className="text-lg font-bold capitalize">
          {element.schoolObj?.name}
        </div>
        <div className="text-md font-normal capitalize">
          {element.cityObj?.city}, {element.cityObj?.province}
        </div>

        <div className="italic">{element.website}</div>
        <div>
          {element.type === "ft" ? "Full Time " : "Part Time "}{" "}
          {displayDisciplineText(element.discipline)}{" "}
        </div>
      </div>
    </div>
  );
}
