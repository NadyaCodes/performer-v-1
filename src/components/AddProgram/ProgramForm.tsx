import React, { useState, useEffect } from "react";
import { NewProgramSubmission } from "../ProgramSearch/types";
import Form from "./Form";

export default function ProgramForm() {
  const blankSchool = {
    schoolName: "",
    city: "",
    province: "",
    website: "",
    discipline: { act: false, sing: false, dance: false, mt: false },
    type: { pt: false, ft: false },
    programName: "",
  };
  const [formData, setFormData] = useState<NewProgramSubmission[]>([
    blankSchool,
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
      newFormData[index][field][subField] = value;
    } else {
      newFormData[index][field] = value;
    }

    setFormData(newFormData);
  };

  const addBlank = () => {
    const formDataCopy = JSON.parse(JSON.stringify(formData));
    formDataCopy.push(blankSchool);
    setFormData(formDataCopy);
  };

  const formDisplay = formData.map((elementData, index) => {
    return (
      <Form elementData={elementData} index={index} updateForm={updateForm} />
    );
  });

  const submitForm = () => {
    console.log("submit!");
  };
  return (
    <div className="flex flex-col content-center justify-center">
      <div className="flex flex-col border-2">
        {formDisplay}
        <div className="flex justify-center">
          <button className="mx-10 mb-5 place-self-end rounded bg-blue-100 p-4 font-bold text-gray-800 hover:shadow-xl">
            Add Similar Program
          </button>
          <button
            className="mx-10 mb-5 place-self-end rounded bg-blue-100 p-4 font-bold text-gray-800 hover:shadow-xl"
            onClick={() => addBlank()}
          >
            Add Blank Program
          </button>
        </div>
      </div>
      <button
        className="m-5 mx-10 place-self-end rounded bg-green-100 p-4 font-bold text-gray-800 hover:shadow-xl"
        onClick={() => submitForm()}
      >
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
