import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import pkg, { School, Location, SchoolLocation } from "@prisma/client";
import { api } from "@component/utils/api";

import { sanitize, isSupported } from "isomorphic-dompurify";
import DOMPurify from "isomorphic-dompurify";

import { PrismaClient } from "@prisma/client";
// import { PrismaClient, Prisma } from "@prisma/client";

// const prisma = new PrismaClient();

import {
  DisciplineObject,
  FormErrorObject,
  LocationObject,
  NewProgramSubmission,
  TypeObject,
} from "../ProgramSearch/types";
import Form from "./Form";
import SubmissionComplete from "./SubmissionComplete";

interface ProgramFormProps {
  findLocation: (cityProv: LocationObject) => Promise<Location | null>;
}

export default function ProgramForm({ findLocation }: ProgramFormProps) {
  const utils = api.useContext();
  let firstId = uuidv4();
  // const [submissionComplete, setSubmissionComplete] = useState(false);

  const blankSchool = {
    schoolName: "",
    city: "",
    province: "",
    website: "",
    discipline: { act: false, sing: false, dance: false, mt: false },
    type: { pt: false, ft: false },
    programName: "",
    tempId: firstId,
  };

  const initialFormErrors: FormErrorObject[] = [];

  const [formData, setFormData] = useState<NewProgramSubmission[]>([
    blankSchool,
  ]);

  const [formErrors, setFormErrors] = useState<FormErrorObject[] | []>(
    initialFormErrors
  );

  const updateForm = (
    value: boolean | string,
    field: string,
    index: number,
    subField?: string
  ) => {
    const newFormData = JSON.parse(JSON.stringify(formData));

    if (subField) {
      newFormData[index][field][subField] = value;
    } else {
      newFormData[index][field] = value.toString();
    }

    setFormData(newFormData);
  };

  const deleteForm = (index: number) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const formDisplay = formData.map((elementData, index) => {
    return (
      <Form
        elementData={elementData}
        index={index}
        updateForm={updateForm}
        deleteForm={deleteForm}
        key={elementData.tempId}
        formErrors={formErrors}
      />
    );
  });

  const addBlank = () => {
    const formDataCopy = JSON.parse(JSON.stringify(formData));
    formDataCopy.push({ ...blankSchool, tempId: uuidv4() });
    setFormData(formDataCopy);
  };

  const addCopy = () => {
    const formDataCopy = JSON.parse(JSON.stringify(formData));
    const lastEntry = formDataCopy[formDataCopy.length - 1];
    formDataCopy.push({ ...lastEntry, tempId: uuidv4() });
    setFormData(formDataCopy);
  };

  const checkObject = (formSubmissionObject: NewProgramSubmission) => {
    const formErrorObject: FormErrorObject = {
      schoolName: !!!formSubmissionObject.schoolName,
      city: !!!formSubmissionObject.city,
      province: !!!formSubmissionObject.province,
      website: !!!formSubmissionObject.website,
      discipline: !!!formSubmissionObject.discipline,
      type: !!!formSubmissionObject.type,
      tempId: formSubmissionObject.tempId,
    };

    if (typeof formSubmissionObject.type === "object") {
      const typeObject = formSubmissionObject.type as TypeObject;
      formErrorObject.type = !typeObject.pt && !typeObject.ft;
    }

    if (typeof formSubmissionObject.discipline === "object") {
      const disciplineObject =
        formSubmissionObject.discipline as DisciplineObject;
      formErrorObject.discipline =
        !disciplineObject.act &&
        !disciplineObject.sing &&
        !disciplineObject.dance &&
        !disciplineObject.mt;
    }

    const errorsPresent = Object.entries(formErrorObject)
      .filter(([key]) => key !== "tempId")
      .some(([_, value]) => value as any);
    return errorsPresent ? formErrorObject : false;
  };

  const findLocation2 = async (cityProv: LocationObject) => {
    const prismaLocation = await utils.location.getOne.fetch(cityProv);
    return prismaLocation;
  };
  // const prisma = new PrismaClient();

  // const submitSchool = async () => {
  //   return <LocationDataFetcher formData={formData[0]} />;
  // };
  // const submitSchool = async (formData: NewProgramSubmission) => {
  //   return <LocationDataFetcher formData={formData} />;
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (formData[0]) {
  //       const locationData = {
  //         city: formData[0]?.city.toLowerCase(),
  //         province: formData[0]?.province.toLowerCase(),
  //       };
  //       const { data: prismaLocation } = await api.location.getOne.useQuery(
  //         locationData
  //       );
  //       console.log(prismaLocation);
  //     }
  //   };

  //   fetchData();
  // }, [formData]);

  // const [formData2, setFormData2] = useState<LocationObject>({
  //   city: "toronto",
  //   province: "ontario",
  // });

  // const submitSchool2 = async () => {
  //   return <LocationDataFetcher formData={formData2} />;
  // };
  //   for (const dataObject of formData) {
  //     const locationData = {
  //       city: dataObject.city.toLowerCase(),
  //       province: dataObject.province.toLowerCase(),
  //     };

  //     // Fetch or create the location in the database
  //     let prismaLocation = await prisma.location.findFirst({
  //       where: {
  //         city: {
  //           equals: locationData.city,
  //         },
  //         province: {
  //           equals: locationData.province,
  //         },
  //       },
  //     });

  //     if (!prismaLocation) {
  //       prismaLocation = await prisma.location.create({
  //         data: locationData,
  //       });
  //     }
  //     console.log(prismaLocation);
  //   }
  // };

  // Call the function with your formData array
  // const formDataCopy = [...formData]; // Your NewProgramSubmission array
  // submitSchool(formDataCopy)
  //   .then(() => {
  //     console.log("Schools submitted to the database successfully!");
  //     prisma.$disconnect(); // Disconnect Prisma client after the operation is done
  //   })
  //   .catch((error) => {
  //     console.error("Error submitting schools:", error);
  //     prisma.$disconnect(); // Disconnect Prisma client on error as well
  //   });

  // const submitSchool = async (formData: NewProgramSubmission[]) => {

  // const { data: locationData } = api.example.getAll.useQuery();

  // const fetchLocation = async (dataObject: LocationObject) => {
  //   // Use the locationData here if needed
  //   console.log(locationData);
  // };

  // formData.forEach((dataObject) => {
  //   const locationData = {
  //     city: dataObject.city.toLowerCase(),
  //     province: dataObject.province.toLowerCase(),
  //   };
  //   fetchLocation(locationData);
  // });
  // const fetchLocation = async (dataObject: LocationObject) => {

  //   const { data: locationData } = api.example.getAll.useQuery();
  //   console.log(locationData);
  // };
  // formData.forEach((dataObject) => {
  //   const locationData = {
  //     city: dataObject.city.toLowerCase(),
  //     province: dataObject.province.toLowerCase(),
  //   };
  //   fetchLocation(locationData);
  // });

  // const addExample = () => {
  //   createExample({
  //     text: "hello",
  //   });
  // };
  // };
  // const fetchLocation = async (dataObject: NewProgramSubmission) => {
  //   const locationData = {
  //     city: dataObject.city.toLowerCase(),
  //     province: dataObject.province.toLowerCase(),
  //   };
  //   const { data: prismaLocation, isLoading } =
  //     useLocationQuery(locationData);
  //   console.log("prismaLocation: ", prismaLocation);
  // };
  // const fetchLocation = async (dataObject: NewProgramSubmission) => {
  //   const locationData = {city: dataObject.city, province: dataObject.province}
  //   const allLocations = api.location.getOne(locationData)
  //   // const { data, isLoading, error } = useQuery('getAllLocations', getAll);

  //   // return api.location.getAll({
  //   //   where: {
  //   //     city: {
  //   //       equals: dataObject?.city,
  //   //     },
  //   //     province: {
  //   //       equals: dataObject?.province,
  //   //     },
  //   //   },
  //   // });
  // };

  // const addLocation = async (formData: NewProgramSubmission) => {
  //   const locationObject = {
  //     city: formData.city.toLowerCase(),
  //     province: formData.province.toLowerCase(),
  //   };
  //   const { mutate: createLocation } = api.location.add.useMutation({
  //     async onSuccess() {
  //       await utils.location.getAll.invalidate();
  //     },
  //     onError(error) {
  //       console.log("createSchool error: ", error);
  //     },
  //   });

  //   createLocation(locationObject);
  // };

  // const fetchSchool = async (dataObject: NewProgramSubmission) => {
  //   return prisma.school.findFirst({
  //     where: {
  //       name: {
  //         equals: dataObject?.schoolName,
  //       },
  //     },
  //   });
  // };

  // const fetchSchoolLocation = async (location: Location, school: School) => {
  //   return prisma.schoolLocation.findFirst({
  //     where: {
  //       schoolId: {
  //         equals: school.id,
  //       },
  //       locationId: {
  //         equals: location.id,
  //       },
  //     },
  //   });
  // };

  // for (const dataObject of formData) {
  //   let prismaLocation =
  //     (await fetchLocation(dataObject)) || (await addLocation(dataObject));
  //   console.log(prismaLocation);
  //   // let prismaSchool = await fetchSchool(dataObject);
  //   // let prismaSchoolLocation =
  //   //   prismaLocation &&
  //   //   prismaSchool &&
  //   //   (await fetchSchoolLocation(prismaLocation, prismaSchool));
  // }
  // };

  const findLoc = async (locationObject: LocationObject) => {
    const prismaLocation = await findLocation2(locationObject);
    return prismaLocation;
    console.log("prismaLocation", prismaLocation);
  };

  const submitForm = (formData: NewProgramSubmission[]) => {
    const errorsArray: FormErrorObject[] = [];
    let safeToSubmit = true;
    formData.forEach((dataObject) => {
      const newFormErrors = checkObject(dataObject);
      if (newFormErrors) {
        safeToSubmit = false;
        errorsArray.push(newFormErrors);
      }
    });
    setFormErrors(errorsArray);
    if (safeToSubmit) {
      const newFormData = formData.map((dataObject) => {
        const newDataObject = JSON.parse(JSON.stringify(dataObject));
        if (!newDataObject.programName) {
          delete newDataObject.programName;
        }
        return newDataObject;
      });
      // After successful form submission, create the link to /submission-result with the data as query parameters
      const linkToSubmissionResult = `/add-program-result?objectToPassToNextURL=${encodeURIComponent(
        JSON.stringify(newFormData)
      )}`;

      console.log(newFormData);
      // Navigate to the new URL
      window.location.href = linkToSubmissionResult;
      // setSubmissionComplete(true);
      // setTimeout(() => {
      //   setSubmissionComplete(false)
      // })
      // formData.forEach((schoolObject) => {
      //   const locationObject = {
      //     city: schoolObject.city,
      //     province: schoolObject.province,
      //   };
      //   const prismaLocation = findLoc(locationObject);
      //   console.log("prismaLocation", prismaLocation);
      //   if (!prismaLocation) {
      //     // console.log("hey");
      //   } // submitSchool(schoolObject);
      // });
      // formData.forEach((dataObject) => {
      //   submitSchool(dataObject)
      // })
    }

    // console.log("safeToSubmit: ", safeToSubmit);
    // console.log("errors Array: ", errorsArray);

    safeToSubmit && console.log("submitted!");
    // const clean = DOMPurify.sanitize(dirty);
  };

  return (
    <div className="flex flex-col content-center justify-center">
      <div className="flex flex-col border-2">
        {formDisplay}
        <div className="flex justify-center">
          <button
            className="mx-10 mb-5 place-self-end rounded bg-blue-100 p-4 font-bold text-gray-800 hover:shadow-xl"
            onClick={() => addCopy()}
          >
            Add Similar Program
          </button>
          <button
            className="mx-10 mb-5 place-self-end rounded bg-blue-100 p-4 font-bold text-gray-800 hover:shadow-xl"
            onClick={() => addBlank()}
          >
            Add Blank Program
          </button>
        </div>
      </div>
      <button
        className="m-5 mx-10 place-self-end rounded bg-green-100 p-4 font-bold text-gray-800 hover:shadow-xl"
        onClick={(e) => {
          e.preventDefault();
          submitForm(formData);
        }}
      >
        Submit
      </button>
    </div>
  );
}
