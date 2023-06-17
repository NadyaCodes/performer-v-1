import { type NextPage } from "next";
import Link from "next/link";
// import { api } from "@component/utils/api";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Page 1
      </h1>
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

export default Home;
