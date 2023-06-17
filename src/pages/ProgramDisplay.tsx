import { type NextPage } from "next";
import Link from "next/link";

type DisciplineProps = {
  style: string;
  discipline: string;
  city: string;
  province: string;
};

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

DisciplinePage.getInitialProps = async () => {
  return {
    style: "style",
    discipline: "discipline",
    city: "city",
    province: "province",
  };
};

export default DisciplinePage;
