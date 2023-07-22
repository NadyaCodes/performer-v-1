import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NewProgramSubmission } from "../ProgramSearch/types";
import SingleProgramResult from "./SingleProgramResult";

export default function AddProgramResultComponent() {
  const router = useRouter();
  const [dataArray, setDataArray] = useState<NewProgramSubmission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (router.query.objectToPassToNextURL) {
        const data = JSON.parse(
          decodeURIComponent(router.query.objectToPassToNextURL as string)
        );
        setDataArray(data);
      }
    };

    fetchData();
  }, [router.query.objectToPassToNextURL]);

  const programDisplay = dataArray.map((object, index) => {
    return <SingleProgramResult schoolObject={object} key={index} />;
  });

  return (
    <div className="m-6 flex flex-col items-center justify-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-900">Results</h1>
      <div>{programDisplay}</div>
    </div>
  );
}
