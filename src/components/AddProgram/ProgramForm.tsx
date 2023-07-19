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

  const deleteForm = (index: number) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const formDisplay = formData.map((elementData, index) => {
    return (
      <Form
        elementData={elementData}
        index={index}
        updateForm={updateForm}
        deleteForm={deleteForm}
        key={index}
      />
    );
  });

  const addBlank = () => {
    const formDataCopy = JSON.parse(JSON.stringify(formData));
    formDataCopy.push(blankSchool);
    setFormData(formDataCopy);
  };

  const addCopy = () => {
    const formDataCopy = JSON.parse(JSON.stringify(formData));
    const lastEntry = formDataCopy[formDataCopy.length - 1];
    formDataCopy.push(lastEntry);
    setFormData(formDataCopy);
  };

  const submitForm = () => {
    formData.forEach((dataObject) => {
      console.log(dataObject);
    });
    console.log("submitted!");
  };

  return (
    <div className="flex flex-col content-center justify-center">
      <div className="flex flex-col border-2">
        {formDisplay}
        <div className="flex justify-center">
          <button
            className="mx-10 mb-5 place-self-end rounded bg-blue-100 p-4 font-bold text-gray-800 hover:shadow-xl"
            onClick={() => addCopy()}
          >
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
