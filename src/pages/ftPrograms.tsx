import { NextPage } from "next";
import { api } from "@component/utils/api";
import { FTProgram, School } from "@prisma/client";

const ftPrograms: NextPage = () => {
  const { data: ftProgramData } = api.ftProgram.getAll.useQuery();
  const { data: schoolLocationData } = api.schoolLocation.getAll.useQuery();
  const { data: schools } = api.school.getAll.useQuery();
  const { data: locations } = api.location.getAll.useQuery();

  const FTProgramItem = ({ element }: { element: FTProgram }) => {
    const schoolLocObj = schoolLocationData?.find(
      (schoolLoc) => schoolLoc.id === element.schoolLocationId
    );
    const cityObj = locations?.find(
      (loc) => loc.id === schoolLocObj?.locationId
    );
    const schoolObj = schools?.find(
      (school) => school.id === schoolLocObj?.schoolId
    );
    return (
      <div className="flex flex-col">
        <div>______________</div>
        {element.id}
        <div className="font-bold">
          <div>{element.name}</div>
          {schoolObj?.name}, {cityObj?.city}
        </div>
        <div className="w-10rem">
          {element.website}, {element.discipline}
        </div>

        <div>______________</div>
      </div>
    );
  };

  const ftProgramDisplay = ftProgramData?.map((element) => {
    return <FTProgramItem key={element.id} element={element} />;
  });
  return (
    <div>
      <div>{ftProgramDisplay}</div>
    </div>
  );
};

export default ftPrograms;
