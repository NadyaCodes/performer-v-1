import React from "react";
import { NewProgramSubmission } from "../ProgramSearch/types";

export default function Form({
  elementData,
  index,
  updateForm,
  deleteForm,
}: {
  elementData: NewProgramSubmission;
  index: number;
  updateForm: Function;
  deleteForm: Function;
}) {
  return (
    <div className="m-7 flex flex-col border-2 p-2">
      <form className="w-full max-w-xl p-3">
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
              value={elementData.schoolName}
              onChange={(e) => updateForm(e.target.value, "schoolName", index)}
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
              value={elementData.city}
              onChange={(e) => updateForm(e.target.value, "city", index)}
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
                value={elementData.province}
                onChange={(e) => updateForm(e.target.value, "province", index)}
              >
                <option value="">Select a province</option>
                <option value="alberta">Alberta</option>
                <option value="british columbia">British Columbia</option>
                <option value="manitoba">Manitoba</option>
                <option value="new brunswick">New Brunswick</option>
                <option value="newfoundland">Newfoundland and Labrador</option>
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
              value={elementData.website}
              onChange={(e) => updateForm(e.target.value, "website", index)}
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
                    checked={elementData.type.pt || false}
                    onChange={(e) =>
                      updateForm(e.target.checked, "type", index, "pt")
                    }
                  />
                  <span className="text-sm">Part Time</span>
                </label>
                <label className="block font-bold text-gray-500 md:w-2/3">
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    checked={elementData.type.ft || false}
                    onChange={(e) =>
                      updateForm(e.target.checked, "type", index, "ft")
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
                      checked={elementData.discipline.act || false}
                      onChange={(e) =>
                        updateForm(e.target.checked, "discipline", index, "act")
                      }
                    />
                    <span className="text-sm">Acting</span>
                  </label>
                  <label className="block font-bold text-gray-500">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={elementData.discipline.sing || false}
                      onChange={(e) =>
                        updateForm(
                          e.target.checked,
                          "discipline",
                          index,
                          "sing"
                        )
                      }
                    />
                    <span className="text-sm">Singing</span>
                  </label>
                  <label className="block font-bold text-gray-500">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={elementData.discipline.dance || false}
                      onChange={(e) =>
                        updateForm(
                          e.target.checked,
                          "discipline",
                          index,
                          "dance"
                        )
                      }
                    />
                    <span className="text-sm">Dancing</span>
                  </label>
                  <label className="block font-bold text-gray-500">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={elementData.discipline.mt || false}
                      onChange={(e) =>
                        updateForm(e.target.checked, "discipline", index, "mt")
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
              value={elementData.programName}
              onChange={(e) => updateForm(e.target.value, "programName", index)}
            />
          </div>
        </div>
      </form>
      <button
        className="m-3 justify-end place-self-end rounded bg-red-300 p-4 font-bold hover:shadow-md md:w-1/3"
        onClick={() => deleteForm(index)}
      >
        Delete This Entry
      </button>
    </div>
  );
}
