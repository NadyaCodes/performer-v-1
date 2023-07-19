import React, { useState, useEffect } from "react";
import { NewProgramSubmission } from "../ProgramSearch/types";

export default function ProgramForm() {
  const [formData, setFormData] = useState<NewProgramSubmission[]>([
    {
      schoolName: "",
      city: "",
      province: "",
      website: "",
      discipline: { act: false, sing: false, dance: false, mt: false },
      type: { pt: false, ft: false },
      programName: "",
    },
  ]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const updateForm = (
    value: boolean | string,
    field: string,
    index: number,
    subField?: string
  ) => {
    const newFormData = JSON.parse(JSON.stringify(formData));

    if (subField) {
      console.log(
        "newFormData[index][field][subField]: ",
        newFormData[index][field][subField]
      );
      console.log("value: ", value);
      newFormData[index][field][subField] = value;
    } else {
      newFormData[index][field] = value;
    }

    setFormData(newFormData);
  };

  const submitForm = () => {};
  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-2">
        <form className="w-full max-w-xl p-8">
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="w-full px-3">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="school-name"
              >
                School Name
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="school-name"
                type="text"
                placeholder="Name"
                value={formData[0]?.schoolName}
                onChange={(e) => updateForm(e.target.value, "schoolName", 0)}
              />
            </div>
          </div>
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="school-city"
              >
                City
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="school-city"
                type="text"
                placeholder="City"
                value={formData[0]?.city}
                onChange={(e) => updateForm(e.target.value, "city", 0)}
              />
              <p className="text-xs italic text-gray-600">
                For multiple locations, please "Add similar program" below
              </p>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="school-province"
              >
                Province
              </label>
              <div className="relative">
                <select
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 capitalize leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="school-province"
                  value={formData[0]?.province}
                  onChange={(e) => updateForm(e.target.value, "province", 0)}
                >
                  <option value="">Select a province</option>
                  <option value="alberta">Alberta</option>
                  <option value="british columbia">British Columbia</option>
                  <option value="manitoba">Manitoba</option>
                  <option value="new brunswick">New Brunswick</option>
                  <option value="newfoundland">
                    Newfoundland and Labrador
                  </option>
                  <option value="northwest territories">
                    Northwest Territories
                  </option>
                  <option value="nova scotia">Nova Scotia</option>
                  <option value="nunavut">Nunavut</option>
                  <option value="ontario">Ontario</option>
                  <option value="prince edward island">
                    Prince Edward Island
                  </option>
                  <option value="quebec">Quebec</option>
                  <option value="saskatchewan">Saskatchewan</option>
                  <option value="yukon">Yukon</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="w-full px-3">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="school-website"
              >
                Website
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="school-website"
                type="text"
                placeholder="Website"
                value={formData[0]?.website}
                onChange={(e) => updateForm(e.target.value, "website", 0)}
              />
            </div>
          </div>
          <div className="mb-2 flex flex-wrap">
            <div className="mb-6 flex flex-wrap md:w-1/3">
              <div className="w-full px-3">
                <label className="block font-bold text-gray-500">
                  Program Type
                  <label className="block font-bold text-gray-500 md:w-2/3">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={formData[0]?.type.pt || false}
                      onChange={(e) =>
                        updateForm(e.target.checked, "type", 0, "pt")
                      }
                    />
                    <span className="text-sm">Part Time</span>
                  </label>
                  <label className="block font-bold text-gray-500 md:w-2/3">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={formData[0]?.type.ft || false}
                      onChange={(e) =>
                        updateForm(e.target.checked, "type", 0, "ft")
                      }
                    />
                    <span className="text-sm">Full Time</span>
                  </label>
                </label>
              </div>
            </div>
            <div className="mb-2 flex flex-wrap md:w-2/3">
              <div className="mb-6 flex w-full flex-wrap">
                <div className="w-full px-3">
                  <label className="block font-bold text-gray-500">
                    Disciplines Offered
                    <label className="block font-bold text-gray-500">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={formData[0]?.discipline.act || false}
                        onChange={(e) =>
                          updateForm(e.target.checked, "discipline", 0, "act")
                        }
                      />
                      <span className="text-sm">Acting</span>
                    </label>
                    <label className="block font-bold text-gray-500">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={formData[0]?.discipline.sing || false}
                        onChange={(e) =>
                          updateForm(e.target.checked, "discipline", 0, "sing")
                        }
                      />
                      <span className="text-sm">Singing</span>
                    </label>
                    <label className="block font-bold text-gray-500">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={formData[0]?.discipline.dance || false}
                        onChange={(e) =>
                          updateForm(e.target.checked, "discipline", 0, "dance")
                        }
                      />
                      <span className="text-sm">Dancing</span>
                    </label>
                    <label className="block font-bold text-gray-500">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        checked={formData[0]?.discipline.mt || false}
                        onChange={(e) =>
                          updateForm(e.target.checked, "discipline", 0, "mt")
                        }
                      />
                      <span className="text-sm">Musical Theatre</span>
                    </label>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="program-name"
              >
                Program Name (Full-Time Programs only)
              </label>
              <input
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="program-name"
                type="text"
                placeholder="Name"
                value={formData[0]?.programName}
                onChange={(e) => updateForm(e.target.value, "programName", 0)}
              />
            </div>
          </div>
        </form>
        <button className="mx-10 mb-5 place-self-end rounded bg-blue-100 p-4 font-bold text-gray-800 hover:shadow-xl">
          Add Similar Program
        </button>
      </div>
      <button className="m-5 mx-10 place-self-end rounded bg-green-100 p-4 font-bold text-gray-800 hover:shadow-xl">
        Submit
      </button>
    </div>
  );
}

{
  /* // <div className="m-2 flex flex-col">
    //   <div class="md:w-1/3">
    //     <label
    //       class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
    //       for="inline-full-name"
    //     >
    //       Full Name
    //     </label>
    //   </div>
    //   <input
    //     className="focus:shadow-outline w-96 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
    //     id="username"
    //     type="text"
    //     placeholder="School Name"
    //     value={formData.schoolName}
    //     onChange={(e) =>
    //       setFormData({ ...formData, schoolName: e.target.value })
    //     }
    //   />
    //   <button
    //     className="my-2 w-60 rounded border-2 border-green-300 p-2"
    //     onClick={() => submitForm()}
    //   >
    //     Submit Form
    //   </button>
    // </div> */
}

{
  /*/////////////////////////////////////////*/
}
{
  /* <div className="-mx-3 mb-2 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-city"
          >
            City
          </label>
          <input
            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-city"
            type="text"
            placeholder="Albuquerque"
          />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-state"
          >
            State
          </label>
          <div className="relative">
            <select
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
            >
              <option>New Mexico</option>
              <option>Missouri</option>
              <option>Texas</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-zip"
          >
            Zip
          </label>
          <input
            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-zip"
            type="text"
            placeholder="90210"
          />
        </div>
      </div> */
}
