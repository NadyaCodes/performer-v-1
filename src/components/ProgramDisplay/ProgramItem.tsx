import React from "react";

interface ProgramDisplayProps {
  element: string;
}

const ProgramItem: React.FC<ProgramDisplayProps> = ({ element }) => {
  return <div>{element}</div>;
};
export default ProgramItem;
