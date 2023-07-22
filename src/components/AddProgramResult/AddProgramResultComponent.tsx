import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NewProgramSubmission } from "../ProgramSearch/types";
import SingleProgramResult from "./SingleProgramResult";

export default function AddProgramResultComponent() {
  const router = useRouter();
  const [dataArray, setDataArray] = useState<NewProgramSubmission[]>([]);
  const [currentProgram, setCurrentProgram] = useState<number>(0);
  const [displayPrograms, setDisplayPrograms] = useState<
    NewProgramSubmission[]
  >(dataArray[0] ? [dataArray[0]] : []);

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

  useEffect(() => {
    if (
      dataArray.length > 0 &&
      currentProgram >= 0 &&
      currentProgram < dataArray.length
    ) {
      let newDisplayPrograms = [...displayPrograms];
      const newProgramSubmission = dataArray[currentProgram];
      if (newProgramSubmission) {
        newDisplayPrograms.push(newProgramSubmission);
        setDisplayPrograms(newDisplayPrograms);
      }
    }
  }, [dataArray, currentProgram]);

  const programDisplay = displayPrograms?.map((object, index) => {
    return (
      <SingleProgramResult
        schoolObject={object}
        key={index}
        setCurrentProgram={setCurrentProgram}
        currentProgram={currentProgram}
      />
    );
  });

  return (
    <div className="m-6 flex flex-col items-center justify-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-900">Results</h1>
      <div>{displayPrograms && programDisplay}</div>
    </div>
  );
}
