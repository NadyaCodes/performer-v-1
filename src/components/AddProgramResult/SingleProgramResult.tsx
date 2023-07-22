import React, { useEffect, useState } from "react";
import { NewProgramSubmission } from "../ProgramSearch/types";
import { LocationObject } from "../ProgramSearch/types";
import { api } from "@component/utils/api";
import { useEffectOnce } from "./helpers";
import { Location, School } from "@prisma/client";

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
  const [prismaLocationObject, setPrismaLocationObject] = useState<Location>({
    city: "",
    province: "",
    area: "",
    id: "",
  });

  const [prismaSchoolObject, setPrismaSchoolObject] = useState<School>({
    id: "",
    name: "",
  });

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
    try {
      const prismaSchool = await findPrismaSchool(schoolName);
      if (!prismaSchool) {
        console.log(`Need to add school ${schoolName}`);
        const addedSchool = await addPrismaSchool(schoolName);
        console.log("Added school:", schoolName);
        return addedSchool; // Return the added location
      } else {
        console.log("Location already exists:", schoolName);
        setPrismaSchoolObject(prismaSchool);
        return prismaSchool; // Return the existing location
      }
    } catch (error) {
      console.error("Error:", error);
      throw error; // Throw the error to propagate it to the caller
    }
  };

  useEffectOnce(() => {
    console.log("Fetching prisma locations");
    fetchDataAndAddLocation()
      .then((locationResult) => {
        console.log("Location Result:", locationResult);
        fetchDataAndAddSchool().then((schoolResult) =>
          console.log("School Add Result: ", schoolResult)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  useEffect(() => {
    if (prismaLocationObject.id && prismaSchoolObject.id) {
      setCurrentProgram(currentProgram + 1);
    }
  }, [prismaLocationObject, prismaSchoolObject]);

  return (
    <div>
      {schoolName}, {programName && programName}
      <div>
        Location:
        {prismaLocationObject.id}, {prismaLocationObject.city},{" "}
        {prismaLocationObject.province}
      </div>
      <div>
        School:
        {prismaSchoolObject.id}, {prismaSchoolObject.name}
      </div>
      <div>__________________________</div>
    </div>
  );
};

export default SingleProgramResult;
