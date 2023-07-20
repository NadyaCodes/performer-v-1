import React, { useState } from "react";
import ProgramForm from "./ProgramForm";
import { api } from "@component/utils/api";
import { LocationObject } from "../ProgramSearch/types";

export default function AddProgramComponent() {
  const utils = api.useContext();

  const findLocation = async (cityProv: LocationObject) => {
    const prismaLocation = await utils.location.getOne.fetch(cityProv);
    return prismaLocation;
  };
  return (
    <div className="m-6 flex flex-col items-center justify-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-900">
        Enter Program Details
      </h1>
      <ProgramForm findLocation={findLocation} />
    </div>
  );
}
