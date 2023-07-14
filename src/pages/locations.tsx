import { NextPage } from "next";
import { api } from "@component/utils/api";
import { Location } from "@prisma/client";

const Locations: NextPage = () => {
  const { data: locationData } = api.location.getAll.useQuery();

  const LocationItem = ({ element }: { element: Location }) => {
    return (
      <div className="flex flex-col">
        <div>______________</div>
        <div className="w-10rem">
          {element.city}, {element.province}
        </div>
        {element.province !== element.area && <div>{element.area}</div>}
        <div>______________</div>
      </div>
    );
  };

  const locationDisplay = locationData?.map((element) => {
    return <LocationItem key={element.id} element={element} />;
  });
  return (
    <div>
      <div>{locationDisplay}</div>
    </div>
  );
};

export default Locations;
