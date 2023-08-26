import React, {
  type SetStateAction,
  useEffect,
  useState,
  type Dispatch,
  useCallback,
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

  const addSchoolLocationCB = useCallback(
    ({
      schoolId,
      locationId,
      website,
    }: {
      schoolId: string;
      locationId: string;
      website: string;
    }) => {
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

      try {
        addSchoolLocation({
          schoolId,
          locationId,
          website,
        });
      } catch (error) {
        console.error("Error adding Prisma School Location: ", error);
      }
    },
    [createSchoolLocation]
  );

  const addPrismaSchoolLocationCB = useCallback(
    async ({
      schoolId,
      locationId,
      website,
    }: {
      schoolId: string;
      locationId: string;
      website: string;
    }) => {
      const addPrismaSchoolLocationInternal = async () => {
        try {
          const data = addSchoolLocationCB({
            schoolId,
            locationId,
            website,
          });
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

      try {
        await addPrismaSchoolLocationInternal();
      } catch (error) {
        console.error("Error adding Prisma School Location: ", error);
      }
    },
    [addSchoolLocationCB, findPrismaSchoolLocation]
  );

  //FETCHING AND ADDING PROGRAM

  const useFindPrismaProgram = () => {
    const findPrismaProgram = useCallback(
      async ({
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
      },
      []
    );

    return findPrismaProgram;
  };

  const findPrismaProgram = useFindPrismaProgram();

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

  const addProgramCB = useCallback(
    ({
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

      try {
        addProgram({
          schoolLocationId,
          discipline,
          type,
          website,
          name,
        });
      } catch (error) {
        console.error("Error finding Prisma Program: ", error);
      }
    },
    [createPtProgram, createFtProgram]
  );

  const addPrismaProgramCB = useCallback(
    async ({
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
          const data = addProgramCB({
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
          console.error(
            "Error fetching Prisma program in addPrismaProgramCB:",
            error
          );
          return null;
        }
      };
      try {
        await addPrismaProgram({
          schoolLocationId,
          discipline,
          type,
          website,
          name,
        });
      } catch (error) {
        console.error("Error adding Prisma School Location: ", error);
      }
    },
    [addProgramCB, findPrismaProgram]
  );

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
          const addedProgram = await addPrismaProgramCB({
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
  const fetchDataAndAddSchoolLocationCB = useCallback(async () => {
    const cleanWebsite = DOMPurify.sanitize(website.toLowerCase());

    if (prismaSchoolObject && prismaLocationObject) {
      try {
        const prismaSchoolLocation = await findPrismaSchoolLocation({
          schoolId: prismaSchoolObject.id,
          locationId: prismaLocationObject.id,
        });
        if (!prismaSchoolLocation) {
          const addedSchoolLocation = await addPrismaSchoolLocationCB({
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
    addPrismaSchoolLocationCB,
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
    setFetchSchoolLocationFlag(false);
  }, [
    fetchSchoolLocationFlag,
    prismaLocationObject,
    prismaSchoolObject,
    fetchDataAndAddSchoolLocationCB,
    website,
  ]);

  useEffect(() => {
    if (prismaLocationObject && prismaSchoolObject) {
      setFetchSchoolLocationFlag(true);
    }
  }, [prismaLocationObject, prismaSchoolObject]);

  //CREATE PROGRAM
  const fetchDataAndAddProgramCB = useCallback(fetchDataAndAddProgram, [
    prismaSchoolLocationObject,
    prismaLocationObject,
    prismaSchoolObject,
    discipline,
    type,
    programName,
    website,
    addPrismaProgramCB,
    findPrismaProgram,
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
