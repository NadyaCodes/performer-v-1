import React from "react";
import ProgramForm from "./ProgramForm";
import AuthShowcase from "../Menu/AuthShowcase";

export default function AddProgramComponent({ admin }: { admin: boolean }) {
  return (
    <div className="m-6 flex flex-col items-center justify-center">
      <div className="place-self-end">
        <AuthShowcase />
      </div>
      {admin ? (
        <div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Enter Program Details
          </h1>
          <ProgramForm />
        </div>
      ) : (
        <div>Please sign in to use this page</div>
      )}
    </div>
  );
}
