import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type {
  DisciplineObject,
  FormErrorObject,
  NewProgramSubmission,
  TypeObject,
} from "../ProgramFinder/types";
import Form from "./Form";

export type UpdateFormFunction = (
  value: boolean | string,
  field: string,
  index: number,
  subField?: string
) => void;

export type DeleteFormFunction = (index: number) => void;

export default function ProgramForm() {
  const firstId = uuidv4();

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

  const updateForm: UpdateFormFunction = (
    value: boolean | string,
    field: string,
    index: number,
    subField?: string
  ) => {
    const newFormData = JSON.parse(JSON.stringify(formData));

    if (subField) {
      newFormData[index][field][subField] = value;
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
    setFormData((prevFormData) => [
      ...prevFormData,
      { ...blankSchool, tempId: uuidv4() },
    ]);
  };

  const addCopy = () => {
    setFormData((prevFormData: NewProgramSubmission[]) => {
      const lastEntry = prevFormData[prevFormData.length - 1] || blankSchool;

      const newEntry = {
        tempId: uuidv4(),
        schoolName: lastEntry.schoolName,
        city: lastEntry.city,
        province: lastEntry.province,
        website: lastEntry.website,
        discipline: lastEntry.discipline,
        type: lastEntry.type,
        programName: lastEntry.programName,
      };
      return [...prevFormData, newEntry];
    });
  };

  const checkObject = (formSubmissionObject: NewProgramSubmission) => {
    const formErrorObject: FormErrorObject = {
      schoolName: !formSubmissionObject.schoolName,
      city: !formSubmissionObject.city,
      province: !formSubmissionObject.province,
      website: !formSubmissionObject.website,
      discipline: !formSubmissionObject.discipline,
      type: !formSubmissionObject.type,
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
      .some(([_, value]) => value);
    return errorsPresent ? formErrorObject : false;
  };

  const submitForm = (formData: NewProgramSubmission[]) => {
    const errorsArray: FormErrorObject[] = [];
    let safeToSubmit = true;
    formData.forEach((dataObject) => {
      const newFormErrors = checkObject(dataObject);
      if (newFormErrors) {
        safeToSubmit = false;
        errorsArray.push(newFormErrors);
      }
    });
    setFormErrors(errorsArray as FormErrorObject[] | []);
    if (safeToSubmit) {
      const newFormData: NewProgramSubmission[] = formData.map((dataObject) => {
        const newDataObject = {
          ...dataObject,
          discipline: { ...dataObject.discipline },
          type: { ...dataObject.type },
        };
        if (!newDataObject.programName) {
          delete newDataObject.programName;
        }
        return newDataObject;
      });
      const linkToSubmissionResult = `/add-program-result?objectToPassToNextURL=${encodeURIComponent(
        JSON.stringify(newFormData)
      )}`;
      window.location.href = linkToSubmissionResult;
    }
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
        onClick={(e) => {
          e.preventDefault();
          submitForm(formData);
        }}
      >
        Submit
      </button>
    </div>
  );
}
