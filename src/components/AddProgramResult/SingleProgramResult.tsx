import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { LocationObject } from "../ProgramFinder/types";
import { api } from "@component/utils/api";
import DOMPurify from "isomorphic-dompurify";
import { useEffectOnce } from "./helpers";
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
  currentProgram: number;
}

const SingleProgramResult: React.FC<SingleProgramResultProps> = ({
  schoolObject,
  setCurrentProgram,
  currentProgram,
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
  ///////////LEAVING THIS IN HERE IN CASE I SCREWED UP THE LOGIC

  // const { mutate: createLocation } = api.location.add.useMutation({
  //   async onSuccess(data) {
  //     await utils.location.getAll.invalidate();
  //     setPrismaLocationObject(data);
  //     return data;
  //   },
  //   onError(error) {
  //     console.log("createExample error: ", error);
  //   },
  // });

  // const addLocation = (locationObject: LocationObject) => {
  //   return createLocation(locationObject);
  // };

  // const addPrismaLocation = async (cityProv: LocationObject) => {
  //   try {
  //     const data = await addLocation(cityProv);
  //     const prismaLocation = await findPrismaLocation(cityProv);
  //     return prismaLocation;
  //   } catch (error) {
  //     console.error("Error fetching Prisma location:", error);
  //     return null;
  //   }
  // };

  const { mutate: createLocation } = api.location.add.useMutation({
    async onSuccess(data) {
      await utils.location.getAll.invalidate();
      setPrismaLocationObject(data);
    },
    onError: (error) => {
      console.log("createLocation error: ", error);
    },
  });

  const addLocation = (locationObject: LocationObject) => {
    createLocation(locationObject);
  };

  const addPrismaLocation = async (cityProv: LocationObject) => {
    try {
      addLocation(cityProv);
      const prismaLocation = await findPrismaLocation(cityProv);
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
      addSchool(name);
      const prismaSchool = await findPrismaSchool(name);
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
  const findPrismaSchoolLocation = async ({
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
  };

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
      addSchoolLocation({ schoolId, locationId, website });
      const prismaSchoolLocation = await findPrismaSchoolLocation({
        schoolId,
        locationId,
      });
      return prismaSchoolLocation;
    } catch (error) {
      console.error("Error fetching Prisma school location:", error);
      return null;
    }
  };

  const fetchDataAndAddSchoolLocation = async () => {
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
  };

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
      addProgram({
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
        throw error; // Throw the error to propagate it to the caller
      }
    }
  };

  //CREATE FINAL SCHOOL AND LOCATION
  useEffectOnce(async () => {
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
  useEffect(() => {
    // const fetchSchoolLocation = async () => {
    //   if (prismaLocationObject && prismaSchoolObject) {
    //     const schoolLocationResult = await fetchDataAndAddSchoolLocation();
    //     console.log("School Location Result: ", schoolLocationResult);
    //   }
    // };

    // fetchSchoolLocation().catch((error) =>
    //   console.error("Error fetching school location: ", error)
    // );
    const fetchSchoolLocation = async () => {
      try {
        if (prismaLocationObject && prismaSchoolObject) {
          const schoolLocationResult = await fetchDataAndAddSchoolLocation();
          console.log("School Location Result: ", schoolLocationResult);
        }
      } catch (error) {
        console.error("Error fetching school location: ", error);
      }
    };

    fetchSchoolLocation();
  }, [prismaLocationObject, prismaSchoolObject]);

  //CREATE PROGRAM
  useEffect(() => {
    // const fetchProgram = async () => {
    //   if (prismaSchoolLocationObject) {
    //     const programResult = await fetchDataAndAddProgram();
    //     console.log("Program result: ", programResult);
    //   }
    // };

    // fetchProgram().catch((error) =>
    //   console.error("Error fetching program: ", error)
    // );
    const fetchProgram = async () => {
      try {
        if (prismaSchoolLocationObject) {
          const programResult = await fetchDataAndAddProgram();
          console.log("Program result: ", programResult);
        }
      } catch (error) {
        console.error("Error fetching program: ", error);
      }
    };

    fetchProgram();
  }, [prismaSchoolLocationObject]);

  useEffect(() => {
    if (
      prismaLocationObject &&
      prismaSchoolObject &&
      prismaSchoolLocationObject &&
      prismaProgram
    ) {
      setCurrentProgram(currentProgram + 1);
    }
  }, [
    prismaLocationObject,
    prismaSchoolObject,
    prismaSchoolLocationObject,
    prismaProgram,
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
