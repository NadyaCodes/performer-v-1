import { NextPage } from "next";
import { api } from "@component/utils/api";
import { PTProgram, School } from "@prisma/client";

const ptPrograms: NextPage = () => {
  const { data: ptProgramData } = api.ptProgram.getAll.useQuery();
  const { data: schoolLocationData } = api.schoolLocation.getAll.useQuery();
  const { data: schools } = api.school.getAll.useQuery();
  const { data: locations } = api.location.getAll.useQuery();

  const PTProgramItem = ({ element }: { element: PTProgram }) => {
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
          {schoolObj?.name}, {cityObj?.city}
        </div>
        <div className="w-10rem">
          {element.website}, {element.discipline}
        </div>

        <div>______________</div>
      </div>
    );
  };

  const ptProgramDisplay = ptProgramData?.map((element) => {
    return <PTProgramItem key={element.id} element={element} />;
  });
  return (
    <div>
      <div>{ptProgramDisplay}</div>
    </div>
  );
};

export default ptPrograms;
