import React from "react";
import { NewProgramSubmission } from "../ProgramSearch/types";
import { LocationObject } from "../ProgramSearch/types";
import { api } from "@component/utils/api";
import { useEffectOnce } from "./helpers";

interface SingleProgramResultProps {
  schoolObject: NewProgramSubmission;
}

const SingleProgramResult: React.FC<SingleProgramResultProps> = ({
  schoolObject,
}) => {
  const utils = api.useContext();
  const { schoolName, city, province, website, discipline, type, programName } =
    schoolObject;

  const findPrismaLocation = async (cityProv: LocationObject) => {
    try {
      const prismaLocation = await utils.location.getOne.fetch(cityProv);
      return prismaLocation;
    } catch (error) {
      console.error("Error fetching Prisma location:", error);
      return null;
    }
  };

  const { mutate: createLocation } = api.location.add.useMutation({
    async onSuccess() {
      await utils.location.getAll.invalidate();
    },
    onError(error) {
      console.log("createExample error: ", error);
    },
  });

  const addLocation = (locationObject: LocationObject) => {
    createLocation(locationObject);
  };

  const addPrismaLocation = async (cityProv: LocationObject) => {
    try {
      const prismaLocation = addLocation(cityProv);
      return prismaLocation;
    } catch (error) {
      console.error("Error fetching Prisma location:", error);
      return null;
    }
  };

  const fetchDataAndAddLocation = async () => {
    const locationObject = {
      city: schoolObject.city.toLowerCase(),
      province: schoolObject.province.toLowerCase(),
    };

    try {
      const prismaLocation = await findPrismaLocation(locationObject);
      if (!prismaLocation) {
        console.log(`Need to add location ${locationObject.city}`);
        const addedLocation = await addPrismaLocation(locationObject);
        console.log("Added location:", addedLocation);
        return addedLocation; // Return the added location
      } else {
        console.log("Location already exists:", prismaLocation);
        return prismaLocation; // Return the existing location
      }
    } catch (error) {
      console.error("Error:", error);
      throw error; // Throw the error to propagate it to the caller
    }
  };

  useEffectOnce(() => {
    console.log("Fetching prisma locations");
    fetchDataAndAddLocation()
      .then((result) => {
        console.log("Result:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  return (
    <div>
      {schoolName}, {programName && programName}
    </div>
  );
};

export default SingleProgramResult;
///////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { NewProgramSubmission } from "../ProgramSearch/types";
// import { LocationObject } from "../ProgramSearch/types";
// import { api } from "@component/utils/api";

// interface SingleProgramResultProps {
//   schoolObject: NewProgramSubmission;
//   hasApiCallBeenCalled: boolean;
//   setApiCallStatus: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const SingleProgramResult: React.FC<SingleProgramResultProps> = ({
//   schoolObject,
//   hasApiCallBeenCalled,
//   setApiCallStatus,
// }) => {
//   console.log("SingleProgramResultComponent rendering");
//   const utils = api.useContext();
//   const { schoolName, city, province, website, discipline, type, programName } =
//     schoolObject;

//   const locationObject = {
//     city: city.toLowerCase(),
//     province: province.toLowerCase(),
//   };

//   const findPrismaLocation = async (cityProv: LocationObject) => {
//     try {
//       const prismaLocation = await utils.location.getOne.fetch(cityProv);
//       return prismaLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma location:", error);
//       return null;
//     }
//   };

//   const { mutate: createLocation } = api.location.add.useMutation({
//     async onSuccess() {
//       await utils.location.getAll.invalidate();
//     },
//     onError(error) {
//       console.log("createExample error: ", error);
//     },
//   });

//   const addLocation = (locationObject: LocationObject) => {
//     createLocation(locationObject);
//   };

//   const addPrismaLocation = async (cityProv: LocationObject) => {
//     try {
//       const prismaLocation = await addLocation(cityProv); // Await the createLocation mutation
//       return prismaLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma location:", error);
//       return null;
//     }
//   };

//   const [dataFetched, setDataFetched] = useState(false);

//   const fetchDataAndAddLocation = async () => {
//     const locationObject = {
//       city: schoolObject.city,
//       province: schoolObject.province,
//     };

//     try {
//       const prismaLocation = await findPrismaLocation(locationObject);
//       if (!prismaLocation) {
//         console.log(`Need to add location ${locationObject.city}`);
//         const addedLocation = await addPrismaLocation(locationObject);
//         console.log("Added location:", addedLocation);
//         return addedLocation; // Return the added location
//       } else {
//         console.log("Location already exists:", prismaLocation);
//         return prismaLocation; // Return the existing location
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw error; // Throw the error to propagate it to the caller
//     }
//   };

//   useEffect(() => {
//     if (!hasApiCallBeenCalled) {
//       console.log("Fetching prisma locations");
//       fetchDataAndAddLocation()
//         .then((result) => {
//           console.log("Result:", result);
//           setApiCallStatus(true); // Set the status to true once the API call has been made
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }
//   }, [hasApiCallBeenCalled, setApiCallStatus]);

//   return (
//     <div>
//       {schoolName}, {programName && programName}
//     </div>
//   );
// };

// export default SingleProgramResult;

////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { NewProgramSubmission } from "../ProgramSearch/types";
// import { LocationObject } from "../ProgramSearch/types";
// import { api } from "@component/utils/api";

// interface SingleProgramResultProps {
//   schoolObject: NewProgramSubmission;
// }

// const SingleProgramResult: React.FC<SingleProgramResultProps> = ({
//   schoolObject,
// }) => {
//   const utils = api.useContext();
//   const { schoolName, city, province, website, discipline, type, programName } =
//     schoolObject;

//   const locationObject = {
//     city: city.toLowerCase(),
//     province: province.toLowerCase(),
//   };

//   const findPrismaLocation = async (cityProv: LocationObject) => {
//     try {
//       const prismaLocation = await utils.location.getOne.fetch(cityProv);
//       return prismaLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma location:", error);
//       return null;
//     }
//   };

//   const { mutate: createLocation } = api.location.add.useMutation({
//     async onSuccess() {
//       await utils.location.getAll.invalidate();
//     },
//     onError(error) {
//       console.log("createExample error: ", error);
//     },
//   });

//   const [isLocationAdded, setIsLocationAdded] = useState<boolean>(false); // State to track if location is added

//   const fetchDataAndAddLocation = async () => {
//     if (isLocationAdded) return; // Return early if location is already added

//     try {
//       const prismaLocation = await findPrismaLocation(locationObject);
//       if (!prismaLocation) {
//         console.log(`Need to add location ${locationObject.city}`);
//         const addedLocation = await createLocation(locationObject);
//         console.log("Added location:", addedLocation);
//         setIsLocationAdded(true); // Set the state to indicate location is added
//       } else {
//         console.log("Location already exists:", prismaLocation);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // Call fetchDataAndAddLocation when needed
//   useEffect(() => {
//     fetchDataAndAddLocation();
//   }, []);

//   return (
//     <div>
//       {schoolName}, {programName && programName}
//     </div>
//   );
// };

// export default SingleProgramResult;

////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { NewProgramSubmission } from "../ProgramSearch/types";
// import { LocationObject } from "../ProgramSearch/types";
// import { api } from "@component/utils/api";

// interface SingleProgramResultProps {
//   schoolObject: NewProgramSubmission;
// }

// const SingleProgramResult: React.FC<SingleProgramResultProps> = ({
//   schoolObject,
// }) => {
//   console.log("SingleProgramResultComponent rendering");
//   const utils = api.useContext();
//   const { schoolName, city, province, website, discipline, type, programName } =
//     schoolObject;

//   const locationObject = {
//     city: city.toLowerCase(),
//     province: province.toLowerCase(),
//   };

//   const [apiCallMade, setApiCallMade] = useState(false);

//   const findPrismaLocation = async (cityProv: LocationObject) => {
//     try {
//       const prismaLocation = await utils.location.getOne.fetch(cityProv);
//       return prismaLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma location:", error);
//       return null;
//     }
//   };

//   const { mutate: createLocation } = api.location.add.useMutation({
//     async onSuccess() {
//       await utils.location.getAll.invalidate();
//     },
//     onError(error) {
//       console.log("createExample error: ", error);
//     },
//   });

//   const addLocation = async (locationObject: LocationObject) => {
//     try {
//       const prismaLocation = await createLocation(locationObject);
//       return prismaLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma location:", error);
//       return null;
//     }
//   };

//   const addPrismaLocation = async (cityProv: LocationObject) => {
//     try {
//       const prismaLocation = await addLocation(cityProv);
//       return prismaLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma location:", error);
//       return null;
//     }
//   };

//   const fetchDataAndAddLocation = async () => {
//     const locationObject = {
//       city: schoolObject.city,
//       province: schoolObject.province,
//     };

//     try {
//       const prismaLocation = await findPrismaLocation(locationObject);
//       if (!prismaLocation) {
//         console.log(`Need to add location ${locationObject.city}`);
//         const addedLocation = await addPrismaLocation(locationObject);
//         console.log("Added location:", addedLocation);
//         return addedLocation; // Return the added location
//       } else {
//         console.log("Location already exists:", prismaLocation);
//         return prismaLocation; // Return the existing location
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw error; // Throw the error to propagate it to the caller
//     }
//   };

//   useEffect(() => {
//     console.log("Fetching prisma locations");
//     fetchDataAndAddLocation()
//       .then((result) => {
//         console.log("Result:", result);
//         setApiCallMade(true); // Set the flag to indicate the API call has been made
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, [apiCallMade]);

//   return (
//     <div>
//       {schoolName}, {programName && programName}
//     </div>
//   );
// };

// export default SingleProgramResult;

// const findPrismaSchool = async (schoolName: string) => {
//   try {
//     const prismaSchool = await utils.school.getOne.fetch({
//       name: schoolName,
//     });
//     return prismaSchool;
//   } catch (error) {
//     console.error("Error fetching Prisma location:", error);
//     return null;
//   }
// };

// findPrismaLocation(locationObject).then((prismaLocation) => {
//   if (!prismaLocation) {
//     console.log(`Need to add location ${locationObject.city}`);
//     addPrismaLocation(locationObject)
//       .then((result) => (prismaLocation = result))
//       .then(() => console.log(prismaLocation));
//   }
//   // findPrismaSchool(schoolName).then((prismaSchool) => {
//   //   if (!prismaSchool) {
//   //     console.log(`Need to add school ${schoolName}`);
//   //   }
//   //   console.log(
//   //     "Values currently: ",
//   //     schoolName,
//   //     prismaLocation,
//   //     prismaSchool
//   //   );
//   // });
// });
