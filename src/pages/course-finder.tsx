import CourseFinderComponent from "@component/components/ProgramSearch/CourseFinderComponent";
import { NextPage } from "next";
import Menu from "@component/components/Menu/Menu";

const ProgramSearch: NextPage = () => {
  return (
    <div className="bg-cyan-50">
      <Menu />
      <CourseFinderComponent />
    </div>
  );
};

export default ProgramSearch;
