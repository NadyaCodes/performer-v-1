import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { sanitize, isSupported } from "isomorphic-dompurify";
import DOMPurify from "isomorphic-dompurify";

import {
  DisciplineObject,
  FormErrorObject,
  NewProgramSubmission,
  TypeObject,
} from "../ProgramSearch/types";
import Form from "./Form";

export default function ProgramForm() {
  let firstId = uuidv4();
  const blankSchool = {
    schoolName: "",
    city: "",
    province: "",
    website: "",
    discipline: { act: false, sing: false, dance: false, mt: false },
    type: { pt: false, ft: false },
    programName: "",
    tempId: firstId,
  };

  const initialFormErrors: FormErrorObject[] = [];

  const [formData, setFormData] = useState<NewProgramSubmission[]>([
    blankSchool,
  ]);

  const [formErrors, setFormErrors] = useState<FormErrorObject[] | []>(
    initialFormErrors
  );

  const updateForm = (
    value: boolean | string,
    field: string,
    index: number,
    subField?: string
  ) => {
    const newFormData = JSON.parse(JSON.stringify(formData));

    if (subField) {
      newFormData[index][field][subField] = value.toString();
    } else {
      newFormData[index][field] = value.toString();
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
        key={elementData.tempId}
        formErrors={formErrors}
      />
    );
  });

  const addBlank = () => {
    const formDataCopy = JSON.parse(JSON.stringify(formData));
    formDataCopy.push({ ...blankSchool, tempId: uuidv4() });
    setFormData(formDataCopy);
  };

  const addCopy = () => {
    const formDataCopy = JSON.parse(JSON.stringify(formData));
    const lastEntry = formDataCopy[formDataCopy.length - 1];
    formDataCopy.push({ ...lastEntry, tempId: uuidv4() });
    setFormData(formDataCopy);
  };

  const checkObject = (formSubmissionObject: NewProgramSubmission) => {
    const formErrorObject: FormErrorObject = {
      schoolName: !!!formSubmissionObject.schoolName,
      city: !!!formSubmissionObject.city,
      province: !!!formSubmissionObject.province,
      website: !!!formSubmissionObject.website,
      discipline: !!!formSubmissionObject.discipline,
      type: !!!formSubmissionObject.type,
      tempId: formSubmissionObject.tempId,
    };

    if (typeof formSubmissionObject.type === "object") {
      const typeObject = formSubmissionObject.type as TypeObject;
      formErrorObject.type = !typeObject.pt && !typeObject.ft;
    }

    if (typeof formSubmissionObject.discipline === "object") {
      const disciplineObject =
        formSubmissionObject.discipline as DisciplineObject;
      formErrorObject.discipline =
        !disciplineObject.act &&
        !disciplineObject.sing &&
        !disciplineObject.dance &&
        !disciplineObject.mt;
    }

    const errorsPresent = Object.entries(formErrorObject)
      .filter(([key]) => key !== "tempId")
      .some(([_, value]) => value as any);
    return errorsPresent ? formErrorObject : false;
  };

  const submitForm = () => {
    const errorsArray: FormErrorObject[] = [];
    let safeToSubmit = true;
    formData.forEach((dataObject) => {
      const newFormErrors = checkObject(dataObject);
      if (newFormErrors) {
        safeToSubmit = false;
        errorsArray.push(newFormErrors);
      }
    });
    setFormErrors(errorsArray);
    if (safeToSubmit) {
    }

    console.log("safeToSubmit: ", safeToSubmit);
    console.log("errors Array: ", errorsArray);

    safeToSubmit && console.log("submitted!");
    // const clean = DOMPurify.sanitize(dirty);
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
