import { GetStaticProps, type NextPage } from "next";
import Link from "next/link";
import allCites from "src/data/allCities.json";
import allPtPrograms from "src/data/allPtPrograms.json";
import allFtPrograms from "src/data/allFtPrograms.json";
import allSchoolsLocations from "src/data/allSchoolsLocations.json";
import allSchools from "src/data/allSchools.json";
import {
  styles,
  disciplines,
  provinces,
  provincesFull,
} from "src/data/constants";
import {
  DisciplineProps,
  FTDataProp,
  ObjectList,
  PathsArray,
} from "@component/data/types";

const DisciplinePage: NextPage<DisciplineProps> = ({
  style,
  discipline,
  city,
  province,
  pageData,
}) => {
  const dataDisplay = pageData?.map((element) => {
    const { id, program, site, school_location_id } = element;
    // allSchoolsLocations: AllSchoolsLocations[]
    const schoolId = allSchoolsLocations[school_location_id].school_id;

    return (
      <div key={id}>
        {allSchools[schoolId].name}
        {program}, {site}
      </div>
    );
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-6xl font-extrabold text-white">
        {style} {discipline} programs in {city}, {province}
      </h1>
      <div className="m-10 text-white"> {dataDisplay}</div>
      <Link href="/">
        <button
          style={{ margin: "2rem" }}
          className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-blue-500 hover:text-white"
        >
          Home
        </button>
      </Link>
    </main>
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
  const { style, discipline, city, province } = props;

  let cityObject = Object.values(allCites).find(
    (element) => element.city === city
  );

  if (style === "pt") {
    // // allOfDiscipline = Object.values(allPtPrograms).filter((element) => element.type === discipline)
    // const allOfDiscipline = Object.values(allPtPrograms).filter(
    //   (element) => element.type === discipline
    // );
    // let allSchoolsAtLocation = Object.values(allSchoolsLocations)
    //   .filter((element) => element.location_id === cityObject.id)
    //   .map((element) => element.id);
    // console.log(allSchoolsAtLocation);
    // const tempArray = [];
    // allSchoolsAtLocation.forEach((schoolID) => {
    //   const selectedSchool = allOfDiscipline.find(
    //     (element) => element.school_location_id === schoolID
    //   );
    //   console.log(selectedSchool);
    //   // tempArray.push(selectedSchool[0].site);
    // });
    // // console.log(allOfDiscipline);
    // // finalArray = allOfDiscipline.filter((element) => element.)
    // // finalArray = Object.values(allPtPrograms)
    // //   .filter((element) => element.type === discipline)
    // //   .map((element) => element.site);
    // finalArray = tempArray;
    ///////////
    // const allOfDiscipline = Object.values(allPtPrograms).filter(
    //   (element) => element.type === discipline
    // );
    // let allSchoolsAtLocation = Object.values(allSchoolsLocations)
    //   .filter((element) => element.location_id === cityObject.id)
    //   .map((element) => element.id);
    // console.log(allSchoolsAtLocation);
    // // const tempArray: string[] = [];
    // allSchoolsAtLocation.forEach((schoolID) => {
    //   const selectedSchool = allOfDiscipline.find(
    //     (element) => element.school_location_id === schoolID
    //   );
    //   console.log(selectedSchool);
    //   if (selectedSchool) {
    //     tempArray.push(selectedSchool.site);
    //   }
    //   // tempArray.push(selectedSchool[0].site);
    // });
    // // console.log(allOfDiscipline);
    // // finalArray = allOfDiscipline.filter((element) => element.)
    // // finalArray = Object.values(allPtPrograms)
    // //   .filter((element) => element.type === discipline)
    // //   .map((element) => element.site);
    // // finalArray = tempArray;
    // return tempArray;
    // console.log("fetching ft data");
    // ///////////
    // const tempArray: FTDataProp[] = [];
    // const allOfDiscipline = Object.values(allFtPrograms).filter(
    //   (element) => element.type === discipline
    // );
    // let allSchoolsAtLocation = Object.values(allSchoolsLocations)
    //   .filter((element) => element.location_id === cityObject.id)
    //   .map((school) => school.id);
    // allSchoolsAtLocation.forEach((schoolObj) => {
    //   const selectedSchool = allOfDiscipline.find(
    //     (element) => element.school_location_id === schoolObj
    //   );
    //   if (selectedSchool) {
    //     tempArray.push(selectedSchool);
    //   }
    // });
    // return tempArray;
  }
  if (style === "ft") {
    console.log("fetching ft data");

    ///////////
    const tempArray: FTDataProp[] = [];
    const allOfDiscipline = Object.values(allFtPrograms).filter(
      (element) => element.type === discipline
    );

    let allSchoolsAtLocation = Object.values(allSchoolsLocations)
      .filter((element) => element.location_id === cityObject.id)
      .map((school) => school.id);

    allSchoolsAtLocation.forEach((schoolObj) => {
      // console.log(schoolObj);

      const selectedSchool = allOfDiscipline.find(
        (element) => element.school_location_id === schoolObj
      );
      if (selectedSchool) {
        tempArray.push(selectedSchool);
      }
    });

    return tempArray;
  }
  // console.log(finalArray);

  // allOfDiscipline.forEach((element) => {
  //   if (allOfDiscipline.)
  // })

  // return finalArray;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { style, discipline, city, province } = params as DisciplineProps;
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

export default DisciplinePage;
