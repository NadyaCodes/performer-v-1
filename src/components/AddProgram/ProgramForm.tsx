import React, { useState } from "react";
import { NewProgramSubmission } from "../ProgramSearch/types";

export default function ProgramForm() {
  const [formData, setFormData] = useState<NewProgramSubmission>({
    schoolName: "",
    schoolLocation: [
      {
        city: "",
        province: "",
        website: "",
        discipline: [],
        type: [],
        programName: "",
      },
    ],
  });
  return (
    <div>
      <input></input>
    </div>
  );
}
