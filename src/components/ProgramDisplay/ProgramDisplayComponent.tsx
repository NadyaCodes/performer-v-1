import React from "react";
import ProgramItem from "./ProgramItem";

interface ProgramDisplayProps {
  itemArray: string[];
}

const ProgramDisplayComponent: React.FC<ProgramDisplayProps> = ({
  itemArray,
}) => {
  const programDisplay = itemArray.map((element) => {
    return <ProgramItem element={element} key={element} />;
  });
  return <div>{programDisplay}</div>;
};

export default ProgramDisplayComponent;
