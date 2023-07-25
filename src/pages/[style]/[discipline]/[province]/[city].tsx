// import { GetStaticProps, type NextPage } from "next";
// import Link from "next/link";
// import allCites from "src/data/allCities.json";
// import allPtPrograms from "src/data/allPtPrograms.json";
// import allFtPrograms from "src/data/allFtPrograms.json";
// import allSchoolsLocations from "src/data/allSchoolsLocations.json";

// import {
//   styles,
//   disciplines,
//   provinces,
//   provincesFull,
// } from "src/data/constants";
// import {
//   DisciplineProps,
//   ProgramDataProp,
//   PathsArray,
//   AllSchoolsLocations,
//   AllSchools,
// } from "@component/data/types";

// const DisciplinePage: NextPage<DisciplineProps> = ({
//   style,
//   discipline,
//   city,
//   province,
//   pageData,
// }) => {
//   const allSchoolsLocations: AllSchoolsLocations = require("src/data/allSchoolsLocations.json");
//   const allSchools: AllSchools = require("src/data/allSchools.json");
//   const backLink = `/${style}/${discipline}/${province}/select-next`;

//   const dataDisplay = pageData?.map((element) => {
//     const { id, program, site, school_location_id } = element;
//     const schoolId = allSchoolsLocations[school_location_id]?.school_id ?? null;

//     return (
//       <div key={id} className="p-6">
//         <div className="text-xl font-bold capitalize">
//           {schoolId ? allSchools[schoolId]?.name : "n/a"}
//         </div>
//         <div className="capitalize italic">{program && program}</div>
//         <div>{site}</div>
//       </div>
//     );
//   });
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
//       <h1 className="text-6xl font-extrabold text-white">
//         {style} {discipline} programs in {city}, {province}
//       </h1>
//       <div className="m-10 text-white"> {dataDisplay}</div>
//       <div>
//         <Link href={backLink}>
//           <button
//             style={{ margin: "2rem" }}
//             className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white"
//           >
//             Back
//           </button>
//         </Link>
//         <Link href="/">
//           <button
//             style={{ margin: "2rem" }}
//             className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white"
//           >
//             Home
//           </button>
//         </Link>
//       </div>
//     </main>
//   );
// };

// const createPaths = (): Array<PathsArray> => {
//   const finalArray: Array<PathsArray> = [];
//   styles.forEach((style) => {
//     disciplines.forEach((discipline) => {
//       provinces.forEach((province) => {
//         const citiesInCategory = Object.values(allCites)
//           .filter((element) => element.province === provincesFull[province])
//           .map((element) => element.city);

//         citiesInCategory.forEach((city) => {
//           finalArray.push({
//             params: {
//               style: style,
//               discipline: discipline,
//               province: province,
//               city: city,
//             },
//           });
//         });
//       });
//     });
//   });
//   return finalArray;
// };

// export async function getStaticPaths() {
//   const paths = createPaths();

//   return {
//     paths,
//     fallback: false,
//   };
// }

// const fetchPageData = (props: DisciplineProps) => {
//   const { style, discipline, city } = props;

//   let cityObject = Object.values(allCites).find(
//     (element) => element.city === city
//   );

//   if (style === "pt") {
//     const tempArray: ProgramDataProp[] = [];
//     const allOfDiscipline = Object.values(allPtPrograms).filter(
//       (element) => element.type === discipline
//     );

//     let allSchoolsAtLocation = Object.values(allSchoolsLocations)
//       .filter(
//         (element) => element.location_id === (cityObject && cityObject.id)
//       )
//       .map((school) => school.id);

//     allSchoolsAtLocation.forEach((schoolObj) => {
//       const selectedSchool = allOfDiscipline.find(
//         (element) => element.school_location_id === schoolObj
//       );
//       if (selectedSchool) {
//         tempArray.push(selectedSchool);
//       }
//     });

//     return tempArray;
//   }
//   if (style === "ft") {
//     const tempArray: ProgramDataProp[] = [];
//     const allOfDiscipline = Object.values(allFtPrograms).filter(
//       (element) => element.type === discipline
//     );

//     let allSchoolsAtLocation = Object.values(allSchoolsLocations)
//       .filter(
//         (element) => element.location_id === (cityObject && cityObject.id)
//       )
//       .map((school) => school.id);

//     allSchoolsAtLocation.forEach((schoolObj) => {
//       const selectedSchool = allOfDiscipline.find(
//         (element) => element.school_location_id === schoolObj
//       );
//       if (selectedSchool) {
//         tempArray.push(selectedSchool);
//       }
//     });

//     return tempArray;
//   }
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { style, discipline, city, province } = {
//     ...(params || { style: "n/a" }),
//     style: params?.style || "n/a",
//   } as DisciplineProps;
//   const propsObject = { style, discipline, city, province };
//   const pageData = fetchPageData(propsObject);

//   return {
//     props: {
//       style,
//       discipline,
//       city,
//       province,
//       pageData,
//     },
//   };
// };

// export default DisciplinePage;

import { GetStaticProps, type NextPage } from "next";
import { useState, useEffect } from "react";
import Link from "next/link";
import allCites from "src/data/allCities.json";
import allPtPrograms from "src/data/allPtPrograms.json";
import allFtPrograms from "src/data/allFtPrograms.json";
import allSchoolsLocations from "src/data/allSchoolsLocations.json";
import { api } from "@component/utils/api";

import {
  styles,
  disciplines,
  provinces,
  provincesFull,
} from "src/data/constants";
import {
  DisciplineProps,
  ProgramDataProp,
  PathsArray,
  AllSchoolsLocations,
  AllSchools,
} from "@component/data/types";
import ProgramDisplayComponent from "@component/components/ProgramDisplay/ProgramDisplayComponent";

import {
  SchoolLocation,
  School,
  Location,
  PTProgram,
  FTProgram,
} from "@prisma/client";

export interface ProgramInfo extends SchoolLocation {
  school: School;
  location: Location;
  PTProgram: PTProgram[];
  FTProgram: FTProgram[];
}

export type ProgramInfoArray = ProgramInfo[];

const DisplayPage: NextPage<DisciplineProps> = ({
  style,
  discipline,
  city,
  province,
  pageData,
}) => {
  const dummyStyle = "ft";
  const dummyDiscipline = "dance";
  const dummyCity = "toronto";
  const dummyProvince = "ontario";

  const [itemArray, setItemArray] = useState(["item1", "item2"]);

  const utils = api.useContext();

  const fetchLocationId = async () => {
    const location = await utils.location.getOne.fetch({
      city: dummyCity,
      province: dummyProvince,
    });
    return location?.id;
  };

  const fetchProgramInfoArray = async (
    locationId: string
  ): Promise<ProgramInfoArray> => {
    const programInfo =
      await utils.schoolLocation.getAllForLocationPlusInfo.fetch({
        locationId,
      });
    return programInfo;
  };

  const filterArray = (
    infoArray: ProgramInfoArray,
    discipline: string,
    style: string
  ) => {
    const filterStyle = infoArray.filter((element) => {
      if (style === "pt") {
        if (element.PTProgram.length > 0) {
          return element;
        }
      }
      if (style === "ft") {
        if (element.FTProgram.length > 0) {
          return element;
        }
      }
    });

    const programArray: ProgramInfoArray = [];

    filterStyle.forEach((element) => {
      if (style === "pt") {
        element?.PTProgram.forEach((program) => {
          if (program.discipline === discipline) {
            programArray.push(element);
          }
        });
      }

      if (style === "ft") {
        element?.FTProgram.forEach((program) => {
          if (program.discipline === discipline) {
            programArray.push(element);
          }
        });
      }
    });
    return programArray;
  };

  const fetchData = async () => {
    try {
      const locationId = await fetchLocationId();
      if (!locationId) {
        console.log("Location ID not found");
        return;
      }

      const programInfoArray: ProgramInfoArray = await fetchProgramInfoArray(
        locationId
      );

      const filteredArray = filterArray(
        programInfoArray,
        dummyDiscipline,
        dummyStyle
      );

      return filteredArray;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error or show a user-friendly error message
    }
  };

  useEffect(() => {
    fetchData().then((result) => {
      if (result) {
        console.log(result);
        const newDisplayArray = result.map((element) => {
          return element.website;
        });
        setItemArray(newDisplayArray);
      }
    });
  }, []);

  // fetchLocationId.then((result) => {
  //   fetchSchoolLocationIds(result);
  // });

  // const allSchoolsLocations: AllSchoolsLocations = require("src/data/allSchoolsLocations.json");
  // const allSchools: AllSchools = require("src/data/allSchools.json");
  // const backLink = `/${style}/${discipline}/${province}/select-next`;

  // const dataDisplay = pageData?.map((element) => {
  //   const { id, program, site, school_location_id } = element;
  //   const schoolId = allSchoolsLocations[school_location_id]?.school_id ?? null;

  //   return (
  //     <div key={id} className="p-6">
  //       <div className="text-xl font-bold capitalize">
  //         {schoolId ? allSchools[schoolId]?.name : "n/a"}
  //       </div>
  //       <div className="capitalize italic">{program && program}</div>
  //       <div>{site}</div>
  //     </div>
  //   );
  // });
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
  //     <h1 className="text-6xl font-extrabold text-white">
  //       {style} {discipline} programs in {city}, {province}
  //     </h1>
  //     <div className="m-10 text-white"> {dataDisplay}</div>
  //     <div>
  //       <Link href={backLink}>
  //         <button
  //           style={{ margin: "2rem" }}
  //           className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white"
  //         >
  //           Back
  //         </button>
  //       </Link>
  //       <Link href="/">
  //         <button
  //           style={{ margin: "2rem" }}
  //           className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white"
  //         >
  //           Home
  //         </button>
  //       </Link>
  //     </div>
  //   </main>
  // );
  return (
    <div>
      <ProgramDisplayComponent itemArray={itemArray} />
    </div>
  );
};

const createPaths = (): Array<PathsArray> => {
  const finalArray: Array<PathsArray> = [];
  styles.forEach((style) => {
    disciplines.forEach((discipline) => {
      provinces.forEach((province) => {
        const citiesInCategory = Object.values(allCites)
          .filter((element) => element.province === provincesFull[province])
          .map((element) => element.city);

        citiesInCategory.forEach((city) => {
          finalArray.push({
            params: {
              style: style,
              discipline: discipline,
              province: province,
              city: city,
            },
          });
        });
      });
    });
  });
  return finalArray;
};

export async function getStaticPaths() {
  const paths = createPaths();

  return {
    paths,
    fallback: false,
  };
}

const fetchPageData = (props: DisciplineProps) => {
  const { style, discipline, city } = props;

  let cityObject = Object.values(allCites).find(
    (element) => element.city === city
  );

  if (style === "pt") {
    const tempArray: ProgramDataProp[] = [];
    const allOfDiscipline = Object.values(allPtPrograms).filter(
      (element) => element.type === discipline
    );

    let allSchoolsAtLocation = Object.values(allSchoolsLocations)
      .filter(
        (element) => element.location_id === (cityObject && cityObject.id)
      )
      .map((school) => school.id);

    allSchoolsAtLocation.forEach((schoolObj) => {
      const selectedSchool = allOfDiscipline.find(
        (element) => element.school_location_id === schoolObj
      );
      if (selectedSchool) {
        tempArray.push(selectedSchool);
      }
    });

    return tempArray;
  }
  if (style === "ft") {
    const tempArray: ProgramDataProp[] = [];
    const allOfDiscipline = Object.values(allFtPrograms).filter(
      (element) => element.type === discipline
    );

    let allSchoolsAtLocation = Object.values(allSchoolsLocations)
      .filter(
        (element) => element.location_id === (cityObject && cityObject.id)
      )
      .map((school) => school.id);

    allSchoolsAtLocation.forEach((schoolObj) => {
      const selectedSchool = allOfDiscipline.find(
        (element) => element.school_location_id === schoolObj
      );
      if (selectedSchool) {
        tempArray.push(selectedSchool);
      }
    });

    return tempArray;
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { style, discipline, city, province } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as DisciplineProps;
  const propsObject = { style, discipline, city, province };
  const pageData = fetchPageData(propsObject);

  return {
    props: {
      style,
      discipline,
      city,
      province,
      pageData,
    },
  };
};

export default DisplayPage;
