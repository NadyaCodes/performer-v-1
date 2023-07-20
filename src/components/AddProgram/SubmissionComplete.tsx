// import React, { useEffect, useState } from "react";
// import { NewProgramSubmission, LocationObject } from "../ProgramSearch/types";
// import { api } from "@component/utils/api";
// import { NextPage } from "next";
// import { Location } from "@prisma/client";

// interface SubmissionCompleteProps {
//   formData: NewProgramSubmission[];
// }

// const SubmissionComplete: NextPage<SubmissionCompleteProps> = ({
//   formData,
// }) => {
//   const utils = api.useContext();
//   const [locationData, setLocationData] = useState<LocationObject | null>(null);
//   const [prismaLoc, setPrismaLoc] = useState<Location[]>([]);

//   const findLocation = async (cityProv: LocationObject) => {
//     const prismaLocation = await utils.location.getOne.fetch(cityProv);
//     return prismaLocation;
//   };

//   useEffect(() => {
//     console.log("fetching location data");
//     const fetchLocationData = async () => {
//       if (locationData) {
//         const newPrismaLoc = await findLocation(locationData);
//         if (newPrismaLoc) {
//           const prismaLocCopy = [...prismaLoc].concat(newPrismaLoc);
//           setPrismaLoc(prismaLocCopy);
//         } else {
//           const prismaLocCopy = [...prismaLoc].concat({
//             id: "",
//             city: "",
//             province: "",
//             area: "",
//           });
//           setPrismaLoc(prismaLocCopy);
//         }
//       }
//     };
//     fetchLocationData();
//   }, [locationData]);

//   useEffect(() => {
//     console.log("setting location data");
//     if (Array.isArray(formData)) {
//       // console.log("formData", formData);
//       formData.forEach((programObject) => {
//         console.log("programObject", programObject);
//         const cityProv = {
//           city: programObject.city,
//           province: programObject.province,
//         };
//         setLocationData(cityProv);
//       });
//     }
//   }, [formData]);

//   useEffect(() => {
//     console.log("prismaLoc: ", prismaLoc);
//   }, [prismaLoc]);

//   return (
//     <div>
//       {prismaLoc[0] ? <div>{prismaLoc[0].city}</div> : <div>Loading...</div>}
//     </div>
//   );
// };

// export default SubmissionComplete;

/////////////////////////

import React, { useEffect, useState } from "react";
import { NewProgramSubmission, LocationObject } from "../ProgramSearch/types";
import { api } from "@component/utils/api";
import { NextPage } from "next";
import { Location } from "@prisma/client";

interface SubmissionCompleteProps {
  formData: NewProgramSubmission[];
}

const SubmissionComplete: NextPage<SubmissionCompleteProps> = ({
  formData,
}) => {
  const utils = api.useContext();
  const [prismaLoc, setPrismaLoc] = useState<Location[]>([]);

  const findLocation = async (cityProv: LocationObject) => {
    const prismaLocation = await utils.location.getOne.fetch(cityProv);
    return prismaLocation;
  };

  useEffect(() => {
    console.log("setting location data");
    if (Array.isArray(formData)) {
      const fetchData = async () => {
        const newPrismaLocs = await Promise.all(
          formData.map((programObject) => {
            const cityProv = {
              city: programObject.city,
              province: programObject.province,
            };
            return findLocation(cityProv);
          })
        );

        const prismaLocCopy = newPrismaLocs.map((loc) =>
          loc ? loc : { id: "", city: "", province: "", area: "" }
        );
        setPrismaLoc(prismaLocCopy);
      };

      fetchData();
    }
  }, [formData]);

  useEffect(() => {
    console.log("prismaLoc: ", prismaLoc);
  }, [prismaLoc]);

  return (
    <div>
      {prismaLoc.length > 0 ? (
        <div>
          {prismaLoc.map((location, index) => (
            <div key={index}>{location.city}</div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SubmissionComplete;
