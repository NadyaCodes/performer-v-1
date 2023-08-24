import React, { Dispatch, useState } from "react";
import { api } from "@component/utils/api";
import { useSession } from "next-auth/react";
import type { SetStateAction } from "react";
import type { CustomProgram } from "@prisma/client";
import { cautionCircle } from "@component/data/svgs";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { validateCustom } from "./helpers";
import Link from "next/link";

export type StringInputs = {
  name?: string;
  school?: string;
  city?: string;
  province?: string;
  country?: string;
  website?: string;
};

export type BooleanInputs = {
  typePt?: boolean;
  typeFt?: boolean;
  disciplineAct?: boolean;
  disciplineSing?: boolean;
  disciplineDance?: boolean;
  disciplineMT?: boolean;
};

export type InputObject = StringInputs & BooleanInputs;

export type CustomProgramSubmission = InputObject & {
  userId: string;
};

type FindCustomProgramsFunction = () => Promise<CustomProgram[] | undefined>;

export default function CustomProgramForm({
  setShowUpdateCustom,
  findCustomPrograms,
  setDisplayCustom,
  currentProgram,
}: {
  setShowUpdateCustom: Dispatch<SetStateAction<boolean | CustomProgram>>;
  findCustomPrograms: FindCustomProgramsFunction;
  setDisplayCustom: Dispatch<SetStateAction<CustomProgram[]>>;
  currentProgram: CustomProgram | null;
}) {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const [loading, setLoading] = useState(false);

  const initialUserInput: InputObject = {
    name: currentProgram?.name || undefined,
    school: currentProgram?.school || undefined,
    city: currentProgram?.city || undefined,
    province: currentProgram?.province || undefined,
    country: currentProgram?.country || undefined,
    website: currentProgram?.website || undefined,
    typePt: currentProgram?.typePt || false,
    typeFt: currentProgram?.typeFt || false,
    disciplineAct: currentProgram?.disciplineAct || false,
    disciplineSing: currentProgram?.disciplineSing || false,
    disciplineDance: currentProgram?.disciplineDance || false,
    disciplineMT: currentProgram?.disciplineMT || false,
  };

  const emptyUserInput: InputObject = {
    name: "",
    school: "",
    city: "",
    province: "",
    country: "",
    website: "",
    typePt: false,
    typeFt: false,
    disciplineAct: false,
    disciplineSing: false,
    disciplineDance: false,
    disciplineMT: false,
  };

  const [userInput, setUserInput] = useState(initialUserInput);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutate: addProgram } = api.customProgram.add.useMutation({
    async onSuccess(data) {
      setShowUpdateCustom(false);
      window.scrollTo({
        top: 0,
      });
      setLoading(false);
      setUserInput(emptyUserInput);
      findCustomPrograms().then(
        (customData: CustomProgram[] | undefined) =>
          customData && setDisplayCustom(customData)
      );
      return data;
    },
    onError(error) {
      console.log("addFavPt error: ", error);
    },
  });

  const { mutate: updateProgram } = api.customProgram.update.useMutation({
    async onSuccess(data) {
      setShowUpdateCustom(false);
      window.scrollTo({
        top: 0,
      });
      setLoading(false);
      setUserInput(emptyUserInput);
      findCustomPrograms().then(
        (customData: CustomProgram[] | undefined) =>
          customData && setDisplayCustom(customData)
      );
      return data;
    },
    onError(error) {
      console.log("addFavPt error: ", error);
    },
  });

  const submitCustomProgram = async () => {
    setLoading(true);
    const allKeys = Object.keys(emptyUserInput);

    if (userId) {
      let validated = true;
      const submissionObject: Partial<CustomProgramSubmission> = { userId };
      let valueCounter = 0;

      allKeys.forEach((key) => {
        if (
          typeof userInput[key as keyof InputObject] === "string" &&
          (userInput[key as keyof InputObject] as string).length > 0
        ) {
          const validatedText = validateCustom(
            userInput[key as keyof InputObject] as string,
            setErrorMessage
          );
          if (!validatedText) {
            validated = false;
          }
          if (typeof validatedText === "string") {
            submissionObject[key as keyof StringInputs] = validatedText;
            valueCounter++;
          }
        } else if (typeof userInput[key as keyof InputObject] === "boolean") {
          if (userInput[key as keyof InputObject] === true) {
            submissionObject[key as keyof BooleanInputs] = true;
            valueCounter++;
          }
        }
      });

      if (validated && !currentProgram) {
        if (valueCounter < 1) {
          setLoading(false);
          setErrorMessage("At least one field must have content");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
          return;
        }
        const submitNewProgram = await addProgram({
          ...submissionObject,
        } as CustomProgramSubmission);
        return submitNewProgram;
      }

      if (validated && currentProgram) {
        if (valueCounter < 1) {
          setLoading(false);
          setErrorMessage("At least one field must have content");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
          return;
        }
        const updatedObject = { ...submissionObject, id: currentProgram.id };
        const update = await updateProgram(updatedObject);
        return update;
      }
      if (!validated) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-11/12 md:w-9/12 mobileMenu:w-8/12 ">
      <div className="flex w-full flex-col place-items-center justify-center rounded-lg bg-indigo-50 bg-opacity-20 p-1 pt-4 shadow-md shadow-indigo-900 mobileMenu:m-5 mobileMenu:p-10">
        <h2 className="text-center text-3xl font-extrabold capitalize tracking-tight text-indigo-900 sm:pt-2 mobileMenu:text-5xl">
          Add/Update Custom Program
        </h2>
        <div className="m-5 flex flex-col place-items-center text-center italic text-indigo-950">
          <p className="py-1">
            This program will be added to your private list.
          </p>
          <p className="py-1">
            It is unique to your profile, and will NOT be added to the public
            database.
          </p>
          <p className="py-1">
            To add a program to the public database, please contact us{" "}
            <Link href="/contact" className="text-xl text-indigo-700">
              HERE
            </Link>
          </p>
        </div>

        <div className="m-4 w-full text-indigo-900 mobileMenu:w-9/12">
          <div className="m-6 ">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide "
              htmlFor="name_input"
            >
              Program Name
            </label>
            <input
              className="block w-full appearance-none rounded border border-indigo-200 bg-indigo-50 bg-opacity-60 px-4 py-3 leading-tight text-indigo-950 shadow-md shadow-indigo-200 focus:border-indigo-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
              value={userInput.name}
              type="text"
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              id="name_input"
            />
          </div>

          <div className="m-6">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide "
              htmlFor="school_input"
            >
              School Name
            </label>
            <input
              className="block w-full appearance-none rounded border border-indigo-200 bg-indigo-50 bg-opacity-60 px-4 py-3 leading-tight text-indigo-950 shadow-md shadow-indigo-200 focus:border-indigo-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
              value={userInput.school}
              type="text"
              onChange={(e) =>
                setUserInput({ ...userInput, school: e.target.value })
              }
              id="school_input"
            />
          </div>

          <div className="m-6">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide "
              htmlFor="city_input"
            >
              City
            </label>
            <input
              className="block w-full appearance-none rounded border border-indigo-200 bg-indigo-50 bg-opacity-60 px-4 py-3 leading-tight text-indigo-950 shadow-md shadow-indigo-200 focus:border-indigo-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
              value={userInput.city}
              type="text"
              onChange={(e) =>
                setUserInput({ ...userInput, city: e.target.value })
              }
              id="city_input"
            />
          </div>

          <div className="m-6">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide"
              htmlFor="province_input"
            >
              Province/State
            </label>
            <input
              className="block w-full appearance-none rounded border border-indigo-200 bg-indigo-50 bg-opacity-60 px-4 py-3 leading-tight text-indigo-950 shadow-md shadow-indigo-200 focus:border-indigo-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
              value={userInput.province}
              type="text"
              onChange={(e) =>
                setUserInput({ ...userInput, province: e.target.value })
              }
              id="province_input"
            />
          </div>

          <div className="m-6">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide"
              htmlFor="country_input"
            >
              Country
            </label>
            <input
              className="block w-full appearance-none rounded border border-indigo-200 bg-indigo-50 bg-opacity-60 px-4 py-3 leading-tight text-indigo-950 shadow-md shadow-indigo-200 focus:border-indigo-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
              value={userInput.country}
              type="text"
              onChange={(e) =>
                setUserInput({ ...userInput, country: e.target.value })
              }
              id="country_input"
            />
          </div>

          <div className="m-6">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide"
              htmlFor="website_input"
            >
              Website
            </label>
            <input
              className="block w-full appearance-none rounded border border-indigo-200 bg-indigo-50 bg-opacity-60 px-4 py-3 leading-tight text-indigo-950 shadow-md shadow-indigo-200 focus:border-indigo-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
              value={userInput.website}
              type="text"
              onChange={(e) =>
                setUserInput({ ...userInput, website: e.target.value })
              }
              id="website_input"
            />
          </div>

          <div className="mx-2 mt-7 grid grid-cols-[3fr,4fr] justify-items-center mobileMenu:mx-6 mobileMenu:my-7">
            <div className="p-1">
              <label className="mb-2 block text-sm font-bold uppercase tracking-wide">
                Program Type
                <div className="text-xs normal-case">
                  <label className="mb-2 block text-xs font-bold tracking-wide">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={userInput.typePt || false}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          typePt: e.target.checked,
                        })
                      }
                    />
                    <span className="text-sm">Part Time</span>
                  </label>
                  <label className="mb-2 block text-xs font-bold tracking-wide">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={userInput.typeFt || false}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          typeFt: e.target.checked,
                        })
                      }
                    />
                    <span className="text-sm">Full Time</span>
                  </label>
                </div>
              </label>
            </div>
            <div className="mb-2 flex flex-wrap">
              <div className="w-full mobileMenu:px-3">
                <label className="mb-2 block p-1 text-sm font-bold uppercase tracking-wide">
                  Disciplines Offered
                  <div className="m-2 text-xs normal-case">
                    <label className="mb-2 block text-xs font-bold tracking-wide">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={userInput.disciplineAct || false}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            disciplineAct: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm">Acting</span>
                    </label>
                    <label className="mb-2 block text-xs font-bold tracking-wide ">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={userInput.disciplineSing || false}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            disciplineSing: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm">Singing</span>
                    </label>
                    <label className="tracking-wid mb-2 block text-xs font-bold">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={userInput.disciplineDance || false}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            disciplineDance: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm">Dancing</span>
                    </label>
                    <label className="mb-2 block text-xs font-bold tracking-wide">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={userInput.disciplineMT || false}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            disciplineMT: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm">Musical Theatre</span>
                    </label>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          {errorMessage && (
            <div className="absolute left-1/2 z-20 flex -translate-x-1/2 transform flex-row items-center bg-pink-100 p-2 text-pink-700">
              {cautionCircle}
              <div className="mx-5">{errorMessage}</div>
              {cautionCircle}
            </div>
          )}

          {loading ? (
            <div className="text-indigo-800">
              <LoadingSpinner iconSize="medium" />
            </div>
          ) : (
            <button
              onClick={() => submitCustomProgram()}
              className="mb-5 h-10 w-32 place-items-center justify-between place-self-end rounded border-indigo-800 bg-transparent font-semibold text-indigo-800 outline hover:scale-110 hover:border-transparent hover:bg-indigo-800 hover:text-indigo-50"
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
