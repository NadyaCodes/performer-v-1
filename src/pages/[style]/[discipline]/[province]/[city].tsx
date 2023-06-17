import { GetStaticProps, type NextPage } from "next";
import Link from "next/link";
import allCites from "src/data/allCities.json";

type DisciplineProps = {
  style: string;
  discipline: string;
  city: string;
  province: string;
};

type PathsArray = {
  params: DisciplineProps;
};

type ObjectList = { [key: string]: string };

const DisciplinePage: NextPage<DisciplineProps> = ({
  style,
  discipline,
  city,
  province,
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-6xl font-extrabold text-white">
        {style} {discipline} programs in {city}, {province}
      </h1>
      <div className="m-10 text-white"> Calculated Programs List</div>
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
  const styles = ["pt", "ft"];
  const disciplines = ["act", "sing", "dance", "mt"];
  const provinces = [
    "bc",
    "ab",
    "sk",
    "mb",
    "on",
    "qc",
    "nb",
    "ns",
    "nl",
    "pe",
    "yt",
    "nu",
    "nt",
  ];

  const provincesFull: ObjectList = {
    bc: "british columbia",
    ab: "alberta",
    sk: "saskatchewan",
    mb: "manitoba",
    on: "ontario",
    qc: "québec",
    nb: "new brunswick",
    ns: "nova scotia",
    nl: "newfoundland",
    pe: "prince edward island",
    yt: "yukon",
    nu: "nunavut",
    nt: "northwest territories",
  };
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { style, discipline, city, province } = params as DisciplineProps;

  return {
    props: {
      style,
      discipline,
      city,
      province,
    },
  };
};

// DisciplinePage.getInitialProps = async () => {
//   return {
//     style: "style",
//     discipline: "discipline",
//     city: "city",
//     province: "province",
//   };
// };

export default DisciplinePage;
