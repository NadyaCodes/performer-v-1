import React, {
  type SetStateAction,
  useEffect,
  useState,
  type Dispatch,
  useCallback,
  useMemo,
} from "react";
import type { LocationObject } from "../ProgramFinder/types";
import { api } from "@component/utils/api";
import DOMPurify from "isomorphic-dompurify";
import { useEffectOnceVoidReturn } from "./helpers";
import type {
  FTProgram,
  Location,
  PTProgram,
  School,
  SchoolLocation,
} from "@prisma/client";
import type { SingleProgramSubmission } from "./AddProgramResultComponent";

interface SingleProgramResultProps {
  schoolObject: SingleProgramSubmission;
  setCurrentProgram: Dispatch<SetStateAction<number>>;
}

const SingleProgramResult: React.FC<SingleProgramResultProps> = ({
  schoolObject,
  setCurrentProgram,
}) => {
  const utils = api.useContext();
  const { schoolName, city, province, website, discipline, type, programName } =
    schoolObject;

  const [prismaLocationObject, setPrismaLocationObject] =
    useState<Location | null>(null);

  const [prismaSchoolObject, setPrismaSchoolObject] = useState<School | null>(
    null
  );

  const [prismaSchoolLocationObject, setPrismaSchoolLocationObject] =
    useState<SchoolLocation | null>(null);

  const [prismaProgram, setPrismaProgram] = useState<
    (PTProgram | FTProgram) | null
  >(null);

  //FETCHING AND ADDING LOCATION
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
    async onSuccess(data) {
      await utils.location.getAll.invalidate();
      setPrismaLocationObject(data);
      return data;
    },
    onError(error) {
      console.log("createExample error: ", error);
    },
  });

  const addLocation = (locationObject: LocationObject) => {
    return createLocation(locationObject);
  };

  const addPrismaLocation = async (cityProv: LocationObject) => {
    try {
      const data = addLocation(cityProv);
      const prismaLocation = await findPrismaLocation(cityProv);
      console.log("Added location: ", data);
      return prismaLocation;
    } catch (error) {
      console.error("Error fetching Prisma location:", error);
      return null;
    }
  };

  const fetchDataAndAddLocation = async () => {
    const cleanCity = DOMPurify.sanitize(city.toLowerCase());
    const cleanProvince = DOMPurify.sanitize(province.toLowerCase());
    const locationObject = {
      city: cleanCity,
      province: cleanProvince,
    };

    try {
      const prismaLocation = await findPrismaLocation(locationObject);
      if (!prismaLocation) {
        const addedLocation = await addPrismaLocation(locationObject);
        return addedLocation;
      } else {
        setPrismaLocationObject(prismaLocation);
        return prismaLocation;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  //FETCHING AND ADDING SCHOOL
  const findPrismaSchool = async (nameString: string) => {
    try {
      const prismaSchool = await utils.school.getOne.fetch({
        name: nameString,
      });
      return prismaSchool;
    } catch (error) {
      console.error("Error fetching Prisma school:", error);
      return null;
    }
  };

  const { mutate: createSchool } = api.school.add.useMutation({
    async onSuccess(data) {
      await utils.school.getAll.invalidate();
      setPrismaSchoolObject(data);
      return data;
    },
    onError(error) {
      console.log("createSchool error: ", error);
    },
  });

  const addSchool = (name: string) => {
    return createSchool({ name });
  };

  const addPrismaSchool = async (name: string) => {
    try {
      const data = addSchool(name);
      const prismaSchool = await findPrismaSchool(name);
      console.log("Added School: ", data);
      return prismaSchool;
    } catch (error) {
      console.error("Error fetching Prisma school:", error);
      return null;
    }
  };

  const fetchDataAndAddSchool = async () => {
    const cleanName = DOMPurify.sanitize(schoolName.toLowerCase());
    try {
      const prismaSchool = await findPrismaSchool(cleanName);
      if (!prismaSchool) {
        const addedSchool = await addPrismaSchool(cleanName);
        return addedSchool;
      } else {
        setPrismaSchoolObject(prismaSchool);
        return prismaSchool;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  //FETCHING AND ADDING SCHOOL LOCATION
  // const findPrismaSchoolLocation = async ({
  //   schoolId,
  //   locationId,
  // }: {
  //   schoolId: string;
  //   locationId: string;
  // }) => {
  //   try {
  //     const prismaSchoolLocation = await utils.schoolLocation.getOne.fetch({
  //       schoolId,
  //       locationId,
  //     });
  //     return prismaSchoolLocation;
  //   } catch (error) {
  //     console.error("Error fetching Prisma school location:", error);
  //     return null;
  //   }
  // };
  const findPrismaSchoolLocation = useCallback(
    async ({
      schoolId,
      locationId,
    }: {
      schoolId: string;
      locationId: string;
    }) => {
      try {
        const prismaSchoolLocation = await utils.schoolLocation.getOne.fetch({
          schoolId,
          locationId,
        });
        return prismaSchoolLocation;
      } catch (error) {
        console.error("Error fetching Prisma school location:", error);
        return null;
      }
    },
    [utils.schoolLocation.getOne]
  );

  const { mutate: createSchoolLocation } = api.schoolLocation.add.useMutation({
    async onSuccess(data) {
      await utils.schoolLocation.getAll.invalidate();
      setPrismaSchoolLocationObject(data);
      return data;
    },
    onError(error) {
      console.log("createSchoolLocation error: ", error);
    },
  });

  const addSchoolLocation = ({
    schoolId,
    locationId,
    website,
  }: {
    schoolId: string;
    locationId: string;
    website: string;
  }) => {
    return createSchoolLocation({ schoolId, locationId, website });
  };

  const addPrismaSchoolLocation = async ({
    schoolId,
    locationId,
    website,
  }: {
    schoolId: string;
    locationId: string;
    website: string;
  }) => {
    try {
      const data = addSchoolLocation({ schoolId, locationId, website });
      const prismaSchoolLocation = await findPrismaSchoolLocation({
        schoolId,
        locationId,
      });
      console.log("Added School Location: ", data);
      return prismaSchoolLocation;
    } catch (error) {
      console.error("Error fetching Prisma school location:", error);
      return null;
    }
  };

  // const fetchDataAndAddSchoolLocation = async () => {
  //   const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());

  //   if (prismaSchoolObject && prismaLocationObject) {
  //     try {
  //       const prismaSchoolLocation = await findPrismaSchoolLocation({
  //         schoolId: prismaSchoolObject.id,
  //         locationId: prismaLocationObject.id,
  //       });
  //       if (!prismaSchoolLocation) {
  //         const addedSchoolLocation = await addPrismaSchoolLocation({
  //           schoolId: prismaSchoolObject?.id,
  //           locationId: prismaLocationObject?.id,
  //           website: cleanWebsite,
  //         });
  //         return addedSchoolLocation;
  //       } else {
  //         setPrismaSchoolLocationObject(prismaSchoolLocation);
  //         return prismaSchoolLocation;
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       throw error;
  //     }
  //   }
  // };

  //FETCHING AND ADDING PROGRAM
  const findPrismaProgram = async ({
    schoolLocationId,
    discipline,
    type,
    name,
  }: {
    schoolLocationId: string;
    discipline: string;
    type: string;
    name?: string;
  }) => {
    const programName = name || "* No Name *";
    try {
      let prismaProgram;
      if (type === "pt") {
        prismaProgram = await utils.ptProgram.getOneByLocationObject.fetch({
          schoolLocationId,
          discipline,
        });
      }

      if (type === "ft") {
        prismaProgram = await utils.ftProgram.getOneByLocationObject.fetch({
          schoolLocationId,
          discipline,
          name: programName,
        });
      }
      return prismaProgram;
    } catch (error) {
      console.error("Error fetching Prisma program:", error);
      return null;
    }
  };

  const { mutate: createPtProgram } = api.ptProgram.add.useMutation({
    async onSuccess(data) {
      await utils.ptProgram.getAll.invalidate();
      setPrismaProgram(data);
      return data;
    },
    onError(error) {
      console.log("createPtProgram error: ", error);
    },
  });

  const { mutate: createFtProgram } = api.ftProgram.add.useMutation({
    async onSuccess(data) {
      await utils.ftProgram.getAll.invalidate();
      setPrismaProgram(data);
      return data;
    },
    onError(error) {
      console.log("createFtProgram error: ", error);
    },
  });

  const addProgram = ({
    schoolLocationId,
    discipline,
    type,
    website,
    name,
  }: {
    schoolLocationId: string;
    discipline: string;
    type: string;
    website: string;
    name?: string;
  }) => {
    const programName = name || "* No Name *";
    if (type === "pt") {
      return createPtProgram({ schoolLocationId, website, discipline });
    }
    if (type === "ft") {
      return createFtProgram({
        schoolLocationId,
        website,
        discipline,
        name: programName,
      });
    }
  };

  const addPrismaProgram = async ({
    schoolLocationId,
    discipline,
    type,
    website,
    name,
  }: {
    schoolLocationId: string;
    discipline: string;
    type: string;
    website: string;
    name?: string;
  }) => {
    try {
      const data = addProgram({
        schoolLocationId,
        discipline,
        type,
        website,
        name,
      });
      const prismaProgram = await findPrismaProgram({
        schoolLocationId,
        discipline,
        type,
        name,
      });
      console.log("Added Program: ", data);
      return prismaProgram;
    } catch (error) {
      console.error("Error fetching Prisma program:", error);
      return null;
    }
  };

  const fetchDataAndAddProgram = async () => {
    const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());
    const cleanName = programName
      ? DOMPurify.sanitize(programName.toLowerCase())
      : null;

    if (
      prismaSchoolObject &&
      prismaLocationObject &&
      prismaSchoolLocationObject
    ) {
      try {
        const prismaProgram = await findPrismaProgram({
          schoolLocationId: prismaSchoolLocationObject.id,
          discipline,
          type,
          name: programName,
        });
        if (!prismaProgram) {
          const addedProgram = await addPrismaProgram({
            schoolLocationId: prismaSchoolLocationObject.id,
            discipline,
            type,
            website: cleanWebsite,
            name: cleanName ? cleanName : undefined,
          });
          return addedProgram;
        } else {
          setPrismaProgram(prismaProgram);
          return prismaProgram;
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  };

  //CREATE FINAL SCHOOL AND LOCATION
  // useEffectOnce(async () => {
  //   try {
  //     const locationResult = await fetchDataAndAddLocation();
  //     console.log("Location Result:", locationResult);

  //     const schoolResult = await fetchDataAndAddSchool();
  //     console.log("School Add Result: ", schoolResult);
  //     return;
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // });
  useEffectOnceVoidReturn(async () => {
    try {
      const locationResult = await fetchDataAndAddLocation();
      console.log("Location Result:", locationResult);

      const schoolResult = await fetchDataAndAddSchool();
      console.log("School Add Result: ", schoolResult);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  //CREATE FINAL SCHOOL LOCATION
  // useEffect(() => {
  //   const fetchSchoolLocation = async () => {
  //     if (prismaLocationObject && prismaSchoolObject) {
  //       const schoolLocationResult = await fetchDataAndAddSchoolLocation();
  //       console.log("School Location Result: ", schoolLocationResult);
  //     }
  //   };

  //   fetchSchoolLocation().catch((error) =>
  //     console.error("Error fetching school location: ", error)
  //   );
  // }, [prismaLocationObject, prismaSchoolObject, fetchDataAndAddSchoolLocation]);

  ////////////////
  // const fetchDataAndAddSchoolLocationCB = useCallback(async () => {
  //   const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());

  //   if (prismaSchoolObject && prismaLocationObject) {
  //     try {
  //       const prismaSchoolLocation = await findPrismaSchoolLocation({
  //         schoolId: prismaSchoolObject.id,
  //         locationId: prismaLocationObject.id,
  //       });
  //       if (!prismaSchoolLocation) {
  //         const addedSchoolLocation = await addPrismaSchoolLocation({
  //           schoolId: prismaSchoolObject?.id,
  //           locationId: prismaLocationObject?.id,
  //           website: cleanWebsite,
  //         });
  //         return addedSchoolLocation;
  //       } else {
  //         setPrismaSchoolLocationObject(prismaSchoolLocation);
  //         return prismaSchoolLocation;
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       throw error;
  //     }
  //   }
  // }, [
  //   prismaSchoolObject,
  //   prismaLocationObject,
  //   findPrismaSchoolLocation,
  //   addPrismaSchoolLocation,
  //   website,
  // ]);

  // // Memoize the function using useMemo
  // const memoizedFetchDataAndAddSchoolLocation = useMemo(
  //   fetchDataAndAddSchoolLocationCB,
  //   [prismaSchoolObject, prismaLocationObject]
  // );

  // useEffect(() => {
  //   const fetchSchoolLocation = async () => {
  //     if (prismaLocationObject && prismaSchoolObject) {
  //       const schoolLocationResult =
  //         await memoizedFetchDataAndAddSchoolLocation;
  //       console.log("School Location Result: ", schoolLocationResult);
  //     }
  //   };

  //   fetchSchoolLocation().catch((error) =>
  //     console.error("Error fetching school location: ", error)
  //   );
  // }, [
  //   prismaLocationObject,
  //   prismaSchoolObject,
  //   memoizedFetchDataAndAddSchoolLocation,
  // ]);

  const fetchDataAndAddSchoolLocationCB = useCallback(async () => {
    const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());

    if (prismaSchoolObject && prismaLocationObject) {
      try {
        const prismaSchoolLocation = await findPrismaSchoolLocation({
          schoolId: prismaSchoolObject.id,
          locationId: prismaLocationObject.id,
        });
        if (!prismaSchoolLocation) {
          const addedSchoolLocation = await addPrismaSchoolLocation({
            schoolId: prismaSchoolObject?.id,
            locationId: prismaLocationObject?.id,
            website: cleanWebsite,
          });
          return addedSchoolLocation;
        } else {
          setPrismaSchoolLocationObject(prismaSchoolLocation);
          return prismaSchoolLocation;
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  }, [
    prismaSchoolObject,
    prismaLocationObject,
    findPrismaSchoolLocation,
    addPrismaSchoolLocation,
    website,
  ]);

  const [fetchSchoolLocationFlag, setFetchSchoolLocationFlag] = useState(false);

  useEffect(() => {
    if (fetchSchoolLocationFlag && prismaLocationObject && prismaSchoolObject) {
      const fetchSchoolLocation = async () => {
        try {
          const schoolLocationResult = await fetchDataAndAddSchoolLocationCB();
          console.log("School Location Result: ", schoolLocationResult);
        } catch (error) {
          console.error("Error fetching school location: ", error);
        }
      };

      fetchSchoolLocation().catch((error) =>
        console.error("Error fetching school location: ", error)
      );
    }
    // Reset the flag to false to prevent further runs
    setFetchSchoolLocationFlag(false);
  }, [
    fetchSchoolLocationFlag,
    prismaLocationObject,
    prismaSchoolObject,
    fetchDataAndAddSchoolLocationCB,
    website,
  ]);

  useEffect(() => {
    if (
      !fetchSchoolLocationFlag &&
      prismaLocationObject &&
      prismaSchoolObject
    ) {
      setFetchSchoolLocationFlag(true);
    }
  }, [prismaLocationObject, prismaSchoolObject]);

  // const fetchDataAndAddSchoolLocationCB = useCallback(async () => {
  //   const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());

  //   if (prismaSchoolObject && prismaLocationObject) {
  //     try {
  //       const prismaSchoolLocation = await findPrismaSchoolLocation({
  //         schoolId: prismaSchoolObject.id,
  //         locationId: prismaLocationObject.id,
  //       });
  //       if (!prismaSchoolLocation) {
  //         const addedSchoolLocation = await addPrismaSchoolLocation({
  //           schoolId: prismaSchoolObject?.id,
  //           locationId: prismaLocationObject?.id,
  //           website: cleanWebsite,
  //         });
  //         return addedSchoolLocation;
  //       } else {
  //         setPrismaSchoolLocationObject(prismaSchoolLocation);
  //         return prismaSchoolLocation;
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       throw error;
  //     }
  //   }
  // }, [
  //   prismaSchoolObject,
  //   prismaLocationObject,
  //   findPrismaSchoolLocation,
  //   addPrismaSchoolLocation,
  //   website,
  // ]);

  // useEffect(() => {
  //   const fetchSchoolLocation = async () => {
  //     if (prismaLocationObject && prismaSchoolObject) {
  //       try {
  //         const schoolLocationResult = await fetchDataAndAddSchoolLocationCB();
  //         console.log("School Location Result: ", schoolLocationResult);
  //       } catch (error) {
  //         console.error("Error fetching school location: ", error);
  //       }
  //     }
  //   };

  //   fetchSchoolLocation().catch((error) =>
  //     console.error("Error fetching school location: ", error)
  //   );
  // }, [
  //   prismaLocationObject,
  //   prismaSchoolObject,
  //   fetchDataAndAddSchoolLocationCB, // Just include the function here
  // ]);

  //CREATE PROGRAM
  const fetchDataAndAddProgramCB = useCallback(fetchDataAndAddProgram, [
    prismaSchoolLocationObject,
    prismaLocationObject,
    prismaSchoolObject,
    discipline,
    type,
    programName,
    website,
  ]);

  useEffect(() => {
    const fetchProgram = async () => {
      if (prismaSchoolLocationObject) {
        try {
          const programResult = await fetchDataAndAddProgramCB();
          console.log("Program result: ", programResult);
        } catch (error) {
          console.error("Error fetching program: ", error);
        }
      }
    };

    fetchProgram().catch((error) =>
      console.error("Error fetching program: ", error)
    );
  }, [prismaSchoolLocationObject, fetchDataAndAddProgramCB]);

  // Define the callback function outside the component

  // const fetchDataAndAddProgramCB = useCallback(async () => {
  //   console.log("running callback");
  //   const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());
  //   const cleanName = programName
  //     ? DOMPurify.sanitize(programName.toLowerCase())
  //     : null;

  //   if (
  //     prismaSchoolObject &&
  //     prismaLocationObject &&
  //     prismaSchoolLocationObject
  //   ) {
  //     try {
  //       const prismaProgram = await findPrismaProgram({
  //         schoolLocationId: prismaSchoolLocationObject.id,
  //         discipline,
  //         type,
  //         name: programName,
  //       });
  //       if (!prismaProgram) {
  //         const addedProgram = await addPrismaProgram({
  //           schoolLocationId: prismaSchoolLocationObject.id,
  //           discipline,
  //           type,
  //           website: cleanWebsite,
  //           name: cleanName ? cleanName : undefined,
  //         });
  //         return addedProgram;
  //       } else {
  //         setPrismaProgram(prismaProgram);
  //         return prismaProgram;
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       throw error;
  //     }
  //   }
  // }, [
  //   prismaSchoolLocationObject,
  //   prismaLocationObject,
  //   prismaSchoolObject,
  //   discipline,
  //   type,
  //   programName,
  //   website,
  // ]);
  // // const fetchDataAndAddProgramCB = async () => {
  // //   const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());
  // //   const cleanName = programName
  // //     ? DOMPurify.sanitize(programName.toLowerCase())
  // //     : null;

  // //   if (
  // //     prismaSchoolObject &&
  // //     prismaLocationObject &&
  // //     prismaSchoolLocationObject
  // //   ) {
  // //     try {
  // //       const prismaProgram = await findPrismaProgram({
  // //         schoolLocationId: prismaSchoolLocationObject.id,
  // //         discipline,
  // //         type,
  // //         name: programName,
  // //       });
  // //       if (!prismaProgram) {
  // //         const addedProgram = await addPrismaProgram({
  // //           schoolLocationId: prismaSchoolLocationObject.id,
  // //           discipline,
  // //           type,
  // //           website: cleanWebsite,
  // //           name: cleanName ? cleanName : undefined,
  // //         });
  // //         return addedProgram;
  // //       } else {
  // //         setPrismaProgram(prismaProgram);
  // //         return prismaProgram;
  // //       }
  // //     } catch (error) {
  // //       console.error("Error:", error);
  // //       throw error;
  // //     }
  // //   }
  // // };

  // // Memoize the function using useMemo
  // const memoizedFetchDataAndAddProgram = useMemo(fetchDataAndAddProgramCB, [
  //   prismaSchoolLocationObject,
  //   prismaLocationObject,
  //   prismaSchoolObject,
  //   discipline,
  //   type,
  //   programName,
  //   website,
  // ]);

  // // Then use the memoized function within the useEffect
  // // useEffect(() => {
  // //   const fetchProgram = async () => {
  // //     if (prismaSchoolLocationObject) {
  // //       try {
  // //         const programResult = memoizedFetchDataAndAddProgram;
  // //         console.log("Program result: ", programResult);
  // //       } catch (error) {
  // //         console.error("Error fetching program: ", error);
  // //       }
  // //     }
  // //   };

  // //   fetchProgram();
  // // }, [prismaSchoolLocationObject, memoizedFetchDataAndAddProgram]);
  // const fetchRef = useRef(false);
  // useEffect(() => {
  //   if (!fetchRef.current && prismaSchoolLocationObject) {
  //     fetchRef.current = true;
  //     console.log("fetching program");
  //     const fetchProgram = async () => {
  //       try {
  //         const programResult = await memoizedFetchDataAndAddProgram;
  //         console.log("Program result: ", programResult);
  //         // setPrismaProgram(programResult)
  //       } catch (error) {
  //         console.error("Error fetching program: ", error);
  //       }
  //     };

  //     fetchProgram();
  //   }
  // }, [prismaSchoolLocationObject, memoizedFetchDataAndAddProgram]);

  const incrementProgram = useCallback(() => {
    setCurrentProgram((prev) => prev + 1);
  }, [setCurrentProgram]);

  useEffect(() => {
    if (
      prismaLocationObject &&
      prismaSchoolObject &&
      prismaSchoolLocationObject &&
      prismaProgram
    ) {
      incrementProgram();
    }
  }, [
    prismaLocationObject,
    prismaSchoolObject,
    prismaSchoolLocationObject,
    prismaProgram,
    incrementProgram,
  ]);

  return (
    <div>
      {schoolName}, {programName && programName}
      <div>
        Location:
        {prismaLocationObject?.id}, {prismaLocationObject?.city},{" "}
        {prismaLocationObject?.province}
      </div>
      <div>
        School:
        {prismaSchoolObject?.id}, {prismaSchoolObject?.name}
      </div>
      <div>
        School Location:
        {prismaSchoolLocationObject?.id},{" "}
        {prismaSchoolLocationObject?.locationId},{" "}
        {prismaSchoolLocationObject?.schoolId},{" "}
        {prismaSchoolLocationObject?.website}
      </div>
      <div>
        Program:
        {prismaProgram?.id}, {prismaProgram?.discipline},{" "}
        {prismaProgram?.schoolLocationId}, {prismaProgram?.website}, {type}
      </div>
      <div>__________________________</div>
    </div>
  );
};

export default SingleProgramResult;

// import React, {
//   useEffect,
//   useState,
//   type Dispatch,
//   type SetStateAction,
// } from "react";
// import type { LocationObject } from "../ProgramFinder/types";
// import { api } from "@component/utils/api";
// import DOMPurify from "isomorphic-dompurify";

// import type {
//   FTProgram,
//   Location,
//   PTProgram,
//   School,
//   SchoolLocation,
// } from "@prisma/client";
// import type { SingleProgramSubmission } from "./AddProgramResultComponent";

// interface SingleProgramResultProps {
//   schoolObject: SingleProgramSubmission;
//   setCurrentProgram: Dispatch<SetStateAction<number>>;
//   currentProgram: number;
// }

// const SingleProgramResult: React.FC<SingleProgramResultProps> = ({
//   schoolObject,
//   setCurrentProgram,
//   currentProgram,
// }) => {
//   const utils = api.useContext();
//   const { schoolName, city, province, website, discipline, type, programName } =
//     schoolObject;

//   const [prismaLocationObject, setPrismaLocationObject] =
//     useState<Location | null>(null);

//   const [prismaSchoolObject, setPrismaSchoolObject] = useState<School | null>(
//     null
//   );

//   const [prismaSchoolLocationObject, setPrismaSchoolLocationObject] =
//     useState<SchoolLocation | null>(null);

//   const [prismaProgram, setPrismaProgram] = useState<
//     (PTProgram | FTProgram) | null
//   >(null);

//   //FETCHING AND ADDING LOCATION
//   const findPrismaLocation = async (cityProv: LocationObject) => {
//     try {
//       const prismaLocation = await utils.location.getOne.fetch(cityProv);
//       return prismaLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma location:", error);
//       return null;
//     }
//   };
//   ///////////LEAVING THIS IN HERE IN CASE I SCREWED UP THE LOGIC

//   const { mutate: createLocation } = api.location.add.useMutation({
//     async onSuccess(data) {
//       await utils.location.getAll.invalidate();
//       setPrismaLocationObject(data);
//       return data;
//     },
//     onError(error) {
//       console.log("createExample error: ", error);
//     },
//   });

//   const addLocation = (locationObject: LocationObject) => {
//     return createLocation(locationObject);
//   };

//   const addPrismaLocation = async (cityProv: LocationObject) => {
//     try {
//       const data = await addLocation(cityProv);
//       const prismaLocation = await findPrismaLocation(cityProv);
//       return prismaLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma location:", error);
//       return null;
//     }
//   };

//   // const { mutate: createLocation } = api.location.add.useMutation({
//   //   async onSuccess(data) {
//   //     await utils.location.getAll.invalidate();
//   //     setPrismaLocationObject(data);
//   //   },
//   //   onError: (error) => {
//   //     console.log("createLocation error: ", error);
//   //   },
//   // });

//   // const addLocation = (locationObject: LocationObject) => {
//   //   createLocation(locationObject);
//   // };

//   // const addPrismaLocation = async (cityProv: LocationObject) => {
//   //   try {
//   //     addLocation(cityProv);
//   //     const prismaLocation = await findPrismaLocation(cityProv);
//   //     return prismaLocation;
//   //   } catch (error) {
//   //     console.error("Error fetching Prisma location:", error);
//   //     return null;
//   //   }
//   // };

//   const fetchDataAndAddLocation = async () => {
//     const cleanCity = DOMPurify.sanitize(city.toLowerCase());
//     const cleanProvince = DOMPurify.sanitize(province.toLowerCase());
//     const locationObject = {
//       city: cleanCity,
//       province: cleanProvince,
//     };

//     try {
//       const prismaLocation = await findPrismaLocation(locationObject);
//       if (!prismaLocation) {
//         const addedLocation = await addPrismaLocation(locationObject);
//         return addedLocation;
//       } else {
//         setPrismaLocationObject(prismaLocation);
//         return prismaLocation;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }
//   };

//   //FETCHING AND ADDING SCHOOL
//   const findPrismaSchool = async (nameString: string) => {
//     try {
//       const prismaSchool = await utils.school.getOne.fetch({
//         name: nameString,
//       });
//       return prismaSchool;
//     } catch (error) {
//       console.error("Error fetching Prisma school:", error);
//       return null;
//     }
//   };

//   const { mutate: createSchool } = api.school.add.useMutation({
//     async onSuccess(data) {
//       await utils.school.getAll.invalidate();
//       setPrismaSchoolObject(data);
//       return data;
//     },
//     onError(error) {
//       console.log("createSchool error: ", error);
//     },
//   });

//   const addSchool = (name: string) => {
//     return createSchool({ name });
//   };

//   const addPrismaSchool = async (name: string) => {
//     try {
//       addSchool(name);
//       const prismaSchool = await findPrismaSchool(name);
//       return prismaSchool;
//     } catch (error) {
//       console.error("Error fetching Prisma school:", error);
//       return null;
//     }
//   };

//   const fetchDataAndAddSchool = async () => {
//     const cleanName = DOMPurify.sanitize(schoolName.toLowerCase());
//     try {
//       const prismaSchool = await findPrismaSchool(cleanName);
//       if (!prismaSchool) {
//         const addedSchool = await addPrismaSchool(cleanName);
//         return addedSchool;
//       } else {
//         setPrismaSchoolObject(prismaSchool);
//         return prismaSchool;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }
//   };

//   //FETCHING AND ADDING SCHOOL LOCATION
//   const findPrismaSchoolLocation = async ({
//     schoolId,
//     locationId,
//   }: {
//     schoolId: string;
//     locationId: string;
//   }) => {
//     try {
//       const prismaSchoolLocation = await utils.schoolLocation.getOne.fetch({
//         schoolId,
//         locationId,
//       });
//       return prismaSchoolLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma school location:", error);
//       return null;
//     }
//   };

//   const { mutate: createSchoolLocation } = api.schoolLocation.add.useMutation({
//     async onSuccess(data) {
//       await utils.schoolLocation.getAll.invalidate();
//       setPrismaSchoolLocationObject(data);
//       return data;
//     },
//     onError(error) {
//       console.log("createSchoolLocation error: ", error);
//     },
//   });

//   const addSchoolLocation = ({
//     schoolId,
//     locationId,
//     website,
//   }: {
//     schoolId: string;
//     locationId: string;
//     website: string;
//   }) => {
//     return createSchoolLocation({ schoolId, locationId, website });
//   };

//   const addPrismaSchoolLocation = async ({
//     schoolId,
//     locationId,
//     website,
//   }: {
//     schoolId: string;
//     locationId: string;
//     website: string;
//   }) => {
//     try {
//       addSchoolLocation({ schoolId, locationId, website });
//       const prismaSchoolLocation = await findPrismaSchoolLocation({
//         schoolId,
//         locationId,
//       });
//       return prismaSchoolLocation;
//     } catch (error) {
//       console.error("Error fetching Prisma school location:", error);
//       return null;
//     }
//   };

//   const fetchDataAndAddSchoolLocation = async () => {
//     const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());

//     if (prismaSchoolObject && prismaLocationObject) {
//       try {
//         const prismaSchoolLocation = await findPrismaSchoolLocation({
//           schoolId: prismaSchoolObject.id,
//           locationId: prismaLocationObject.id,
//         });
//         if (!prismaSchoolLocation) {
//           const addedSchoolLocation = await addPrismaSchoolLocation({
//             schoolId: prismaSchoolObject?.id,
//             locationId: prismaLocationObject?.id,
//             website: cleanWebsite,
//           });
//           return addedSchoolLocation;
//         } else {
//           setPrismaSchoolLocationObject(prismaSchoolLocation);
//           return prismaSchoolLocation;
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         throw error;
//       }
//     }
//   };

//   //FETCHING AND ADDING PROGRAM
//   const findPrismaProgram = async ({
//     schoolLocationId,
//     discipline,
//     type,
//     name,
//   }: {
//     schoolLocationId: string;
//     discipline: string;
//     type: string;
//     name?: string;
//   }) => {
//     const programName = name || "* No Name *";
//     try {
//       let prismaProgram;
//       if (type === "pt") {
//         prismaProgram = await utils.ptProgram.getOneByLocationObject.fetch({
//           schoolLocationId,
//           discipline,
//         });
//       }

//       if (type === "ft") {
//         prismaProgram = await utils.ftProgram.getOneByLocationObject.fetch({
//           schoolLocationId,
//           discipline,
//           name: programName,
//         });
//       }
//       return prismaProgram;
//     } catch (error) {
//       console.error("Error fetching Prisma program:", error);
//       return null;
//     }
//   };

//   const { mutate: createPtProgram } = api.ptProgram.add.useMutation({
//     async onSuccess(data) {
//       await utils.ptProgram.getAll.invalidate();
//       setPrismaProgram(data);
//       return data;
//     },
//     onError(error) {
//       console.log("createPtProgram error: ", error);
//     },
//   });

//   const { mutate: createFtProgram } = api.ftProgram.add.useMutation({
//     async onSuccess(data) {
//       await utils.ftProgram.getAll.invalidate();
//       setPrismaProgram(data);
//       return data;
//     },
//     onError(error) {
//       console.log("createFtProgram error: ", error);
//     },
//   });

//   const addProgram = ({
//     schoolLocationId,
//     discipline,
//     type,
//     website,
//     name,
//   }: {
//     schoolLocationId: string;
//     discipline: string;
//     type: string;
//     website: string;
//     name?: string;
//   }) => {
//     const programName = name || "* No Name *";
//     if (type === "pt") {
//       return createPtProgram({ schoolLocationId, website, discipline });
//     }
//     if (type === "ft") {
//       return createFtProgram({
//         schoolLocationId,
//         website,
//         discipline,
//         name: programName,
//       });
//     }
//   };

//   const addPrismaProgram = async ({
//     schoolLocationId,
//     discipline,
//     type,
//     website,
//     name,
//   }: {
//     schoolLocationId: string;
//     discipline: string;
//     type: string;
//     website: string;
//     name?: string;
//   }) => {
//     try {
//       addProgram({
//         schoolLocationId,
//         discipline,
//         type,
//         website,
//         name,
//       });
//       const prismaProgram = await findPrismaProgram({
//         schoolLocationId,
//         discipline,
//         type,
//         name,
//       });
//       return prismaProgram;
//     } catch (error) {
//       console.error("Error fetching Prisma program:", error);
//       return null;
//     }
//   };

//   const fetchDataAndAddProgram = async () => {
//     const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());
//     const cleanName = programName
//       ? DOMPurify.sanitize(programName.toLowerCase())
//       : null;

//     if (
//       prismaSchoolObject &&
//       prismaLocationObject &&
//       prismaSchoolLocationObject
//     ) {
//       try {
//         const prismaProgram = await findPrismaProgram({
//           schoolLocationId: prismaSchoolLocationObject.id,
//           discipline,
//           type,
//           name: programName,
//         });
//         if (!prismaProgram) {
//           const addedProgram = await addPrismaProgram({
//             schoolLocationId: prismaSchoolLocationObject.id,
//             discipline,
//             type,
//             website: cleanWebsite,
//             name: cleanName ? cleanName : undefined,
//           });
//           return addedProgram;
//         } else {
//           setPrismaProgram(prismaProgram);
//           return prismaProgram;
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         throw error; // Throw the error to propagate it to the caller
//       }
//     }
//   };

//   //CREATE FINAL SCHOOL AND LOCATION
//   // useEffectOnce(async () => {
//   //   try {
//   //     const locationResult = await fetchDataAndAddLocation();
//   //     console.log("Location Result:", locationResult);

//   //     const schoolResult = await fetchDataAndAddSchool();
//   //     console.log("School Add Result: ", schoolResult);
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // });
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const locationResult = await fetchDataAndAddLocation();
//         console.log("Location Result:", locationResult);

//         const schoolResult = await fetchDataAndAddSchool();
//         console.log("School Add Result: ", schoolResult);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData().then((error) => console.error("Error fetching data: ", error));
//   }, []);

//   //CREATE FINAL SCHOOL LOCATION
//   useEffect(() => {
//     // const fetchSchoolLocation = async () => {
//     //   if (prismaLocationObject && prismaSchoolObject) {
//     //     const schoolLocationResult = await fetchDataAndAddSchoolLocation();
//     //     console.log("School Location Result: ", schoolLocationResult);
//     //   }
//     // };

//     // fetchSchoolLocation().catch((error) =>
//     //   console.error("Error fetching school location: ", error)
//     // );
//     const fetchSchoolLocation = async () => {
//       try {
//         if (prismaLocationObject && prismaSchoolObject) {
//           const schoolLocationResult = await fetchDataAndAddSchoolLocation();
//           console.log("School Location Result: ", schoolLocationResult);
//         }
//       } catch (error) {
//         console.error("Error fetching school location: ", error);
//       }
//     };

//     fetchSchoolLocation().catch((error) =>
//       console.error("Error fetching school location: ", error)
//     );
//   }, [prismaLocationObject, prismaSchoolObject]);

//   //CREATE PROGRAM
//   useEffect(() => {
//     // const fetchProgram = async () => {
//     //   if (prismaSchoolLocationObject) {
//     //     const programResult = await fetchDataAndAddProgram();
//     //     console.log("Program result: ", programResult);
//     //   }
//     // };

//     // fetchProgram().catch((error) =>
//     //   console.error("Error fetching program: ", error)
//     // );
//     const fetchProgram = async () => {
//       try {
//         if (prismaSchoolLocationObject) {
//           const programResult = await fetchDataAndAddProgram();
//           console.log("Program result: ", programResult);
//         }
//       } catch (error) {
//         console.error("Error fetching program: ", error);
//       }
//     };

//     fetchProgram().catch((error) =>
//       console.error("Error fetching program: ", error)
//     );
//   }, [prismaSchoolLocationObject]);

//   useEffect(() => {
//     if (
//       // prismaLocationObject &&
//       // prismaSchoolObject &&
//       prismaSchoolLocationObject
//       // prismaProgram
//     ) {
//       setCurrentProgram(currentProgram + 1);
//     }
//   }, [
//     // prismaLocationObject,
//     // prismaSchoolObject,
//     prismaSchoolLocationObject,
//     // prismaProgram,
//   ]);

//   return (
//     <div>
//       {schoolName}, {programName && programName}
//       <div>
//         Location:
//         {prismaLocationObject?.id}, {prismaLocationObject?.city},{" "}
//         {prismaLocationObject?.province}
//       </div>
//       <div>
//         School:
//         {prismaSchoolObject?.id}, {prismaSchoolObject?.name}
//       </div>
//       <div>
//         School Location:
//         {prismaSchoolLocationObject?.id},{" "}
//         {prismaSchoolLocationObject?.locationId},{" "}
//         {prismaSchoolLocationObject?.schoolId},{" "}
//         {prismaSchoolLocationObject?.website}
//       </div>
//       <div>
//         Program:
//         {prismaProgram?.id}, {prismaProgram?.discipline},{" "}
//         {prismaProgram?.schoolLocationId}, {prismaProgram?.website}, {type}
//       </div>
//       <div>__________________________</div>
//     </div>
//   );
// };

// export default SingleProgramResult;
