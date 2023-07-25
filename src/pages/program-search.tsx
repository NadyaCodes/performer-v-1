import ProgramSearchComponent from "@component/components/ProgramSearch/ProgramSearchComponent";
import { NextPage } from "next";
import Menu from "@component/components/Menu/Menu";

const ProgramSearch: NextPage = () => {
  return (
    <div>
      <Menu />
      <ProgramSearchComponent />
    </div>
  );
};

export default ProgramSearch;
