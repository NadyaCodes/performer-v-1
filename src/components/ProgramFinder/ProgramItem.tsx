import React, {
  type SetStateAction,
  useState,
  type Dispatch,
  useEffect,
} from "react";
import type { ProgramWithInfo } from "./types";
import { useSession } from "next-auth/react";
import { api } from "@component/utils/api";
import type { FavProgram } from "@prisma/client";
import { displayDisciplineText } from "./helpers";
import Link from "next/link";
import LoadingSpinner from "../Loading/LoadingSpinner";
import ShareOptions from "./ShareOptions";

import { convertUserFavs } from "./helpers";
import ShareIcon from "./ShareIcon";
import SignInPrompt from "./SignInPrompt";

export default function ProgramItem({
  element,
  fetchUserFavsObject,
  setFavesObject,
  favProgramIdsArray,
  loadingFavs,
  setStarPopUp,
  starPopUp,
}: {
  element: ProgramWithInfo;
  setFavesObject: Dispatch<SetStateAction<FavProgram[] | null>> | null;
  fetchUserFavsObject: (
    userId: string
  ) => Promise<FavProgram[] | undefined | null>;
  favProgramIdsArray: string[] | null;
  loadingFavs: boolean | null;
  setStarPopUp?: Dispatch<SetStateAction<string>>;
  starPopUp?: string;
}) {
  const { data: sessionData } = useSession();
  const utils = api.useContext();

  const userId = sessionData?.user.id;
  const type = element.type;

  const [animateStar, setAnimateStar] = useState(false);
  const starAnimation = animateStar
    ? "rotateSwell .8s linear infinite"
    : "none";

  const [share, setShare] = useState(false);
  const [fav, setFav] = useState<boolean>(
    (favProgramIdsArray && favProgramIdsArray.includes(element.id)) || false
  );

  useEffect(() => {
    if (favProgramIdsArray) {
      setFav(favProgramIdsArray.includes(element.id));
    }
  }, [favProgramIdsArray, element.id]);

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
    async onSuccess() {
      if (fetchUserFavsObject && setFavesObject) {
        try {
          if (userId) {
            const result: FavProgram[] | null | undefined =
              await fetchUserFavsObject(userId);
            if (result) {
              const newUserFavs = result;
              setFavesObject(newUserFavs);
              const convertedArray = convertUserFavs(result);
              const filteredArray = convertedArray.filter(
                (element) => element !== undefined
              ) as string[];
              if (filteredArray.includes(element.id)) {
                setFav(true);
              } else {
                setFav(false);
              }
            } else {
              setFavesObject([]);
            }
            setTimeout(() => {
              setAnimateStar(false);
            }, 500);
          }
        } catch (error) {
          console.log("Error fetching user favorites: ", error);
        }
      }
    },
    onError(error) {
      console.log("addFavPt error: ", error);
    },
  });

  const { mutate: addFavFt } = api.favs.addFT.useMutation({
    async onSuccess() {
      if (fetchUserFavsObject && setFavesObject) {
        try {
          if (userId) {
            const result: FavProgram[] | null | undefined =
              await fetchUserFavsObject(userId);
            if (result) {
              const newUserFavs = result;
              setFavesObject(newUserFavs);
              const convertedArray = convertUserFavs(result);
              const filteredArray = convertedArray.filter(
                (element) => element !== undefined
              ) as string[];
              if (filteredArray.includes(element.id)) {
                setFav(true);
              } else {
                setFav(false);
              }
            } else {
              setFavesObject([]);
            }
            setTimeout(() => {
              setAnimateStar(false);
            }, 500);
          }
        } catch (error) {
          console.log("Error fetching user favorites: ", error);
        }
      }
    },
    onError(error) {
      console.log("addFavFt error: ", error);
    },
  });

  const { mutate: deleteFav } = api.favs.deleteById.useMutation({
    async onSuccess() {
      if (fetchUserFavsObject && setFavesObject) {
        try {
          if (userId) {
            const result: FavProgram[] | null | undefined =
              await fetchUserFavsObject(userId);
            if (result) {
              const newUserFavs = result;
              setFavesObject(newUserFavs);
              const convertedArray = convertUserFavs(result);
              const filteredArray = convertedArray.filter(
                (element) => element !== undefined
              ) as string[];
              if (filteredArray.includes(element.id)) {
                setFav(true);
              } else {
                setFav(false);
              }
            } else {
              setFavesObject([]);
            }
            setTimeout(() => {
              setAnimateStar(false);
            }, 500);
          }
        } catch (error) {
          console.log("Error fetching user favorites: ", error);
        }
      }
    },
    onError(error) {
      console.log("deleteFav error: ", error);
    },
  });

  const handleToggleFav = () => {
    if (userId) {
      setAnimateStar(true);
      findFav(type, userId, element.id)
        .then((favProgram) => {
          if (favProgram) {
            return deleteFav({ id: favProgram.id });
          } else {
            if (type === "pt") {
              return addFavPt({ userId, ptProgramId: element.id });
            } else if (type === "ft") {
              return addFavFt({ userId, ftProgramId: element.id });
            }
          }
        })
        .then(() => {
          return fetchUserFavsObject(userId);
        })
        .then((result) => {
          if (result && setFavesObject) {
            setFavesObject(result);
            const convertedArray = convertUserFavs(result);
            const filteredArray = convertedArray.filter(
              (element) => element !== undefined
            ) as string[];
            if (filteredArray.includes(element.id)) {
              setFav(true);
            } else {
              setFav(false);
            }
          }
        })
        .catch((error) => {
          console.error("Error toggling favorite: ", error);
        });
    }
  };

  const handleStarPopUp = () => {
    setStarPopUp && setStarPopUp(element.id);
  };

  const elevatorPitchArray = element.elevatorPitch?.split("###");
  const elevatorPitchDisplay = elevatorPitchArray?.map((element) => {
    return (
      <div className="my-2" key={element}>
        {element}
      </div>
    );
  });

  return (
    <div
      className={`my-16 flex flex-col rounded-md ${
        element.articlePitch || element.elevatorPitch
          ? "border-4 border-yellow-500"
          : "border border-cyan-600"
      }  shadow-md shadow-slate-500 transition-all hover:border-cyan-400  hover:shadow-lg hover:shadow-cyan-800 lg:m-10 3xl:p-5`}
    >
      <div className="hidden h-0 translate-x-20 place-self-end lg:block">
        {share && <ShareOptions program={element} setShare={setShare} />}
      </div>
      {sessionData?.user && !loadingFavs && (
        <div
          className="absolute mx-2 my-4 place-self-end hover:scale-150 hover:cursor-pointer md:mx-5"
          id={"favStar_" + element.id}
        >
          <div
            style={{
              animation: starAnimation,
              transition: "transform 2s ease",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={fav ? "#7986cb" : "none"}
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="#7986cb"
              className="h-6 w-6"
              onClick={handleToggleFav}
            >
              <path
                stroke-linecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>
        </div>
      )}

      {!sessionData?.user && !loadingFavs && handleStarPopUp && (
        <div
          className="absolute mx-2 my-4 place-self-end hover:scale-150 hover:cursor-pointer md:mx-5"
          id={"favStar_" + element.id}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="#7986cb"
            className="h-6 w-6"
            onClick={handleStarPopUp}
          >
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
      )}
      {loadingFavs && (
        <div className="mx-5 my-2 place-self-end">
          <LoadingSpinner iconSize="small" />
        </div>
      )}
      {starPopUp === element.id && (
        <div>
          <SignInPrompt setStarPopUp={setStarPopUp} />
        </div>
      )}

      <div className="my-9 flex flex-col items-center p-2 text-center xs:m-6 md:m-9">
        <div className="text-xl font-bold capitalize">
          {element.schoolObj?.name}
        </div>
        <div className="text-lg font-bold capitalize">
          {"name" in element && element.name && <div>{element.name}</div>}
        </div>
        <div className="text-md font-normal capitalize">
          {element.cityObj?.city}, {element.cityObj?.province}
        </div>

        <div className="break-all italic text-cyan-700 underline">
          <Link href={element.website} target="blank">
            {element.website}
          </Link>
        </div>
        <div>
          {element.type === "ft" ? "Full Time " : "Part Time "}{" "}
          {displayDisciplineText(element.discipline)}{" "}
        </div>
        {element.elevatorPitch && (
          <div className="my-2 text-sm italic">{elevatorPitchDisplay}</div>
        )}
        {element.articlePitch && (
          <Link
            className="text-lg italic text-cyan-600 hover:scale-110"
            href={`/featured-program/${element.id}`}
          >
            ...More Info...
          </Link>
        )}
      </div>
      <ShareIcon share={share} setShare={setShare} />
      <div className="h-0 translate-y-2 place-self-end lg:hidden">
        {share && <ShareOptions program={element} setShare={setShare} />}
      </div>
    </div>
  );
}
