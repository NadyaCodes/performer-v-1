import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type {
  DisciplineObject,
  NewProgramSubmission,
  TypeObject,
} from "../ProgramFinder/types";
import SingleProgramResult from "./SingleProgramResult";

export type SingleProgramSubmission = {
  schoolName: string;
  city: string;
  province: string;
  website: string;
  discipline: string;
  type: string;
  programName?: string;
  tempId: string;
};

export default function AddProgramResultComponent() {
  const router = useRouter();
  const [dataArray, setDataArray] = useState<SingleProgramSubmission[]>([]);
  const [currentProgram, setCurrentProgram] = useState<number>(0);
  const [displayPrograms, setDisplayPrograms] = useState<
    SingleProgramSubmission[]
  >(dataArray[0] ? [dataArray[0]] : []);

  useEffect(() => {
    const fetchData = () => {
      if (router.query.objectToPassToNextURL) {
        const queryParam: string = router.query.objectToPassToNextURL as string;

        const data: NewProgramSubmission[] = JSON.parse(
          decodeURIComponent(queryParam)
        );
        const newDataArray: SingleProgramSubmission[] = [];
        data.forEach((item: NewProgramSubmission) => {
          const types: (keyof TypeObject)[] = ["ft", "pt"];
          const programTypes = types.filter((ty) => item.type[ty]);
          const disciplines: (keyof DisciplineObject)[] = [
            "act",
            "sing",
            "dance",
            "mt",
          ];
          const programDisciplines = disciplines.filter(
            (disc) => item.discipline[disc]
          );
          programTypes.forEach((type) => {
            programDisciplines.forEach((discipline) => {
              newDataArray.push({
                schoolName: item.schoolName,
                city: item.city,
                province: item.province,
                website: item.website,
                discipline: discipline,
                type: type,
                tempId: item.tempId,
                ...(item.programName && { programName: item.programName }),
              });
            });
          });
        });
        setDataArray(newDataArray);
      }
    };

    fetchData();
  }, [router.query.objectToPassToNextURL]);

  useEffect(() => {
    if (
      dataArray.length > 0 &&
      currentProgram >= 0 &&
      currentProgram < dataArray.length
    ) {
      const newProgramSubmission = dataArray[currentProgram];
      if (newProgramSubmission) {
        setDisplayPrograms((prevDisplayPrograms) => [
          ...prevDisplayPrograms,
          newProgramSubmission,
        ]);
      }
    }
  }, [dataArray, currentProgram]);

  const programDisplay = displayPrograms?.map((object, index) => {
    return (
      <SingleProgramResult
        schoolObject={object}
        key={index}
        setCurrentProgram={setCurrentProgram}
        currentProgram={currentProgram}
      />
    );
  });

  return (
    <div className="m-6 flex flex-col items-center justify-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-900">Results</h1>
      <div>{displayPrograms && programDisplay}</div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import type {
//   DisciplineObject,
//   NewProgramSubmission,
//   TypeObject,
// } from "../ProgramFinder/types";
// import SingleProgramResult from "./SingleProgramResult";

// export type SingleProgramSubmission = {
//   schoolName: string;
//   city: string;
//   province: string;
//   website: string;
//   discipline: string;
//   type: string;
//   programName?: string;
//   tempId: string;
// };

// export default function AddProgramResultComponent() {
//   const router = useRouter();
//   const [dataArray, setDataArray] = useState<SingleProgramSubmission[]>([]);
//   const [currentProgram, setCurrentProgram] = useState<number>(0);
//   const [displayPrograms, setDisplayPrograms] = useState<
//     SingleProgramSubmission[]
//   >(dataArray[0] ? [dataArray[0]] : []);

//   useEffect(() => {
//     const fetchData = () => {
//       console.log("fetching data");
//       console.log(router.query.objectToPassToNextURL);
//       if (router.query.objectToPassToNextURL) {
//         const data = JSON.parse(
//           decodeURIComponent(router.query.objectToPassToNextURL as string)
//         ) as NewProgramSubmission[];
//         const newDataArray: SingleProgramSubmission[] = [];
//         data.forEach((item: NewProgramSubmission) => {
//           const types: (keyof TypeObject)[] = ["ft", "pt"];
//           const programTypes = types.filter((ty) => item.type[ty]);
//           const disciplines: (keyof DisciplineObject)[] = [
//             "act",
//             "sing",
//             "dance",
//             "mt",
//           ];
//           const programDisciplines = disciplines.filter(
//             (disc) => item.discipline[disc]
//           );
//           programTypes.forEach((type) => {
//             programDisciplines.forEach((discipline) => {
//               newDataArray.push({
//                 schoolName: item.schoolName,
//                 city: item.city,
//                 province: item.province,
//                 website: item.website,
//                 discipline: discipline,
//                 type: type,
//                 tempId: item.tempId,
//                 ...(item.programName && { programName: item.programName }),
//               });
//             });
//           });
//         });
//         setDataArray(newDataArray);
//       }
//     };

//     fetchData();
//   }, [router.query.objectToPassToNextURL]);

//   useEffect(() => {
//     if (
//       dataArray.length > 0 &&
//       currentProgram >= 0 &&
//       currentProgram < dataArray.length
//     ) {
//       const newDisplayPrograms = [...displayPrograms];
//       const newProgramSubmission = dataArray[currentProgram];
//       if (newProgramSubmission) {
//         newDisplayPrograms.push(newProgramSubmission);
//         setDisplayPrograms(newDisplayPrograms);
//       }
//     }
//   }, [dataArray, currentProgram, displayPrograms]);

//   const programDisplay = displayPrograms?.map((object, index) => {
//     return (
//       <SingleProgramResult
//         schoolObject={object}
//         key={index}
//         setCurrentProgram={setCurrentProgram}
//         currentProgram={currentProgram}
//       />
//     );
//   });

//   return (
//     <div className="m-6 flex flex-col items-center justify-center">
//       <h1 className="mb-2 text-4xl font-bold text-gray-900">Results</h1>
//       <div>{displayPrograms && programDisplay}</div>
//     </div>
//   );
// }
