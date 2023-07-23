import React from "react";
import ProgramForm from "./ProgramForm";
import { api } from "@component/utils/api";

export default function AddProgramComponent() {
  return (
    <div className="m-6 flex flex-col items-center justify-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-900">
        Enter Program Details
      </h1>
      <ProgramForm />
    </div>
  );
}
