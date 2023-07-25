import React from "react";
import ProgramItem from "./ProgramItem";
import { ProgramWithInfo } from "../ProgramSearch/types";

interface ProgramDisplayProps {
  displayArray: JSX.Element[];
}

const ProgramDisplayComponent: React.FC<ProgramDisplayProps> = ({
  displayArray,
}) => {
  // const programDisplay = displayArray.map((element) => {
  //   return <ProgramItem element={element} key={element} />;
  // });
  return <div>{displayArray}</div>;
};

export default ProgramDisplayComponent;
