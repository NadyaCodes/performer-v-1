import React, { Dispatch, useState } from "react";
import { api } from "@component/utils/api";
import { useSession } from "next-auth/react";
import { SetStateAction } from "react";

type UserInputType = {
  name: string;
  school: string;
  city: string;
  province: string;
  country: string;
  website: string;
  type: {
    pt: boolean;
    ft: boolean;
  };
  discipline: {
    act: boolean;
    sing: boolean;
    dance: boolean;
    mt: boolean;
  };
};

export type CustomProgramSubmission = {
  name?: string;
  school?: string;
  city?: string;
  province?: string;
  country?: string;
  website?: string;
  typePt?: boolean;
  typeFt?: boolean;
  disciplineAct?: boolean;
  disciplineSing?: boolean;
  disciplineDance?: boolean;
  disciplineMT?: boolean;
  userId: string;
};

export default function NewCustomProgram({
  setShowAddProgram,
}: {
  setShowAddProgram: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;

  const emptyUserInput = {
    name: "",
    school: "",
    city: "",
    province: "",
    country: "",
    website: "",
    type: {
      pt: false,
      ft: false,
    },
    discipline: {
      act: false,
      sing: false,
      dance: false,
      mt: false,
    },
  };

  const [userInput, setUserInput] = useState(emptyUserInput);

  const { mutate: addProgram } = api.customProgram.add.useMutation({
    async onSuccess(data) {
      setShowAddProgram(false);
      setUserInput(emptyUserInput);
      return data;
    },
    onError(error) {
      console.log("addFavPt error: ", error);
    },
  });

  const submitCustomProgram = async () => {
    const allStringKeys: (keyof UserInputType & keyof typeof userInput)[] = [
      "name",
      "school",
      "city",
      "province",
      "country",
      "website",
    ];

    if (userId) {
      const tempStringObject: { [key: string]: string | boolean | undefined } =
        {};

      allStringKeys.forEach((key) => {
        if (
          typeof userInput[key] === "string" &&
          (userInput[key] as string).length > 0
        ) {
          tempStringObject[key] = userInput[key] as string;
        }
      });

      tempStringObject.typePt = userInput.type.pt ? true : undefined;
      tempStringObject.typeFt = userInput.type.ft ? true : undefined;
      tempStringObject.disciplineAct = userInput.discipline.act
        ? true
        : undefined;
      tempStringObject.disciplineSing = userInput.discipline.sing
        ? true
        : undefined;
      tempStringObject.disciplineDance = userInput.discipline.dance
        ? true
        : undefined;
      tempStringObject.disciplineMT = userInput.discipline.mt
        ? true
        : undefined;

      const submissionObject = Object.assign(
        {},
        ...Object.entries(tempStringObject)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => ({ [key]: value }))
      );

      submissionObject.userId = userId;

      const submitNewProgram = await addProgram(submissionObject);
      return submitNewProgram;
    }
  };

  return (
    <div className="m-5 flex w-full flex-col place-items-center justify-center border-2 p-10">
      <h2 className="text-5xl font-extrabold capitalize tracking-tight text-gray-800 sm:text-[3rem]">
        Add Your Program Here
      </h2>
      <div className="m-5 flex flex-col place-items-center italic">
        <p>This program will be added to your private list.</p>
        <p>
          It is unique to your profile, and will NOT be added to the public
          database.
        </p>
      </div>
      <div className="m-4 w-9/12">
        <div className="m-6">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="name_input"
          >
            Program Name
          </label>
          <input
            className="block w-full appearance-none rounded border-2 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
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
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="school_input"
          >
            School Name
          </label>
          <input
            className="block w-full appearance-none rounded border-2 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
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
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="city_input"
          >
            City
          </label>
          <input
            className="block w-full appearance-none rounded border-2 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
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
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="province_input"
          >
            Province/State
          </label>
          <input
            className="block w-full appearance-none rounded border-2 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
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
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="country_input"
          >
            Country
          </label>
          <input
            className="block w-full appearance-none rounded border-2 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
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
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="website_input"
          >
            Website
          </label>
          <input
            className="block w-full appearance-none rounded border-2 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
            value={userInput.website}
            type="text"
            onChange={(e) =>
              setUserInput({ ...userInput, website: e.target.value })
            }
            id="website_input"
          />
        </div>

        <div className="mb-2 ml-3 flex flex-wrap">
          <div className="mb-6 flex flex-wrap md:w-1/3">
            <div className="w-full px-3">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                Program Type
                <div className="m-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={userInput.type.pt || false}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          type: { ...userInput.type, pt: e.target.checked },
                        })
                      }
                    />
                    <span className="text-sm">Part Time</span>
                  </label>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={userInput.type.ft || false}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          type: { ...userInput.type, ft: e.target.checked },
                        })
                      }
                    />
                    <span className="text-sm">Full Time</span>
                  </label>
                </div>
              </label>
            </div>
          </div>
          <div className="mb-2 flex flex-wrap md:w-2/3">
            <div className="mb-6 flex w-full flex-wrap">
              <div className="w-full px-3">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                  Disciplines Offered
                  <div className="m-2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={userInput.discipline.act || false}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            discipline: {
                              ...userInput.discipline,
                              act: e.target.checked,
                            },
                          })
                        }
                      />
                      <span className="text-sm">Acting</span>
                    </label>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={userInput.discipline.sing || false}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            discipline: {
                              ...userInput.discipline,
                              sing: e.target.checked,
                            },
                          })
                        }
                      />
                      <span className="text-sm">Singing</span>
                    </label>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={userInput.discipline.dance || false}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            discipline: {
                              ...userInput.discipline,
                              dance: e.target.checked,
                            },
                          })
                        }
                      />
                      <span className="text-sm">Dancing</span>
                    </label>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={userInput.discipline.mt || false}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            discipline: {
                              ...userInput.discipline,
                              mt: e.target.checked,
                            },
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
      </div>
      <div>
        <button
          onClick={() => submitCustomProgram()}
          className="mb-5 h-10 w-32 place-items-center justify-between place-self-end rounded border-blue-500 bg-transparent font-semibold text-blue-600 outline hover:border-transparent hover:bg-blue-500 hover:text-white"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
