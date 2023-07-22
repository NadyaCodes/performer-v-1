import React, { useEffect, useState } from "react";
import { NewProgramSubmission } from "../ProgramSearch/types";
import { LocationObject } from "../ProgramSearch/types";
import { api } from "@component/utils/api";
import DOMPurify from "isomorphic-dompurify";
import { useEffectOnce } from "./helpers";
import { Location, School, SchoolLocation } from "@prisma/client";

interface SingleProgramResultProps {
  schoolObject: NewProgramSubmission;
  setCurrentProgram: Function;
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
      const data = await addLocation(cityProv); // Await the mutation here
      console.log("data in addPrismaLocation: ", data);
      // Now, fetch the updated location data
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
        console.log(`Need to add location ${locationObject.city}`);
        const addedLocation = await addPrismaLocation(locationObject);
        console.log("Added location:", addedLocation);
        return addedLocation; // Return the added location
      } else {
        console.log("Location already exists:", prismaLocation);
        setPrismaLocationObject(prismaLocation);
        return prismaLocation; // Return the existing location
      }
    } catch (error) {
      console.error("Error:", error);
      throw error; // Throw the error to propagate it to the caller
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
      const data = await addSchool(name); // Await the mutation here
      // Now, fetch the updated location data
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
        console.log(`Need to add school ${cleanName}`);
        const addedSchool = await addPrismaSchool(cleanName);
        console.log("Added school:", cleanName);
        return addedSchool; // Return the added location
      } else {
        console.log("Location already exists:", cleanName);
        setPrismaSchoolObject(prismaSchool);
        return prismaSchool; // Return the existing location
      }
    } catch (error) {
      console.error("Error:", error);
      throw error; // Throw the error to propagate it to the caller
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
      const data = await addSchoolLocation({ schoolId, locationId, website }); // Await the mutation here
      // Now, fetch the updated location data
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
    console.log("starting  add school location");
    console.log(
      "location: ",
      prismaLocationObject,
      "school: ",
      prismaSchoolObject
    );
    if (prismaSchoolObject && prismaLocationObject) {
      console.log("running if statement line 229");
      try {
        const prismaSchoolLocation = await findPrismaSchoolLocation({
          schoolId: prismaSchoolObject.id,
          locationId: prismaLocationObject.id,
        });
        if (!prismaSchoolLocation) {
          console.log(
            `Need to add school location for SchoolId: ${prismaSchoolObject?.id}, LocationId: ${prismaLocationObject?.id}`
          );
          const addedSchoolLocation = await addPrismaSchoolLocation({
            schoolId: prismaSchoolObject?.id,
            locationId: prismaLocationObject?.id,
            website: cleanWebsite,
          });
          console.log(
            `Added school location for SchoolId: ${prismaSchoolObject?.id}, LocationId: ${prismaLocationObject?.id}`
          );
          return addedSchoolLocation; // Return the added location
        } else {
          console.log(
            `Location already exists for SchoolId: ${prismaSchoolObject?.id}, LocationId: ${prismaLocationObject?.id}`
          );
          setPrismaSchoolLocationObject(prismaSchoolLocation);
          return prismaSchoolLocation; // Return the existing location
        }
      } catch (error) {
        console.error("Error:", error);
        throw error; // Throw the error to propagate it to the caller
      }
    }
  };

  //CREATE FINAL SCHOOL AND LOCATION
  useEffectOnce(() => {
    console.log("Fetching prisma locations");
    fetchDataAndAddLocation()
      .then((locationResult) => {
        console.log("Location Result:", locationResult);
        fetchDataAndAddSchool().then((schoolResult) => {
          console.log("School Add Result: ", schoolResult);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  //CREATE FINAL SCHOOL LOCATION
  useEffect(() => {
    if (prismaLocationObject && prismaSchoolObject) {
      fetchDataAndAddSchoolLocation().then((schoolLocationResult) => {
        console.log("School Location Result: ", schoolLocationResult);
      });
    }
  }, [prismaLocationObject, prismaSchoolObject]);

  useEffect(() => {
    if (
      prismaLocationObject &&
      prismaSchoolObject &&
      prismaSchoolLocationObject
    ) {
      setCurrentProgram(currentProgram + 1);
    }
  }, [prismaLocationObject, prismaSchoolObject, prismaSchoolLocationObject]);

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
      <div>__________________________</div>
    </div>
  );
};

export default SingleProgramResult;
