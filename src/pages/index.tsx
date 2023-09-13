import { type NextPage } from "next";
import Head from "next/head";
import Menu from "@component/components/Menu/Menu";
import HomeComponent from "@component/components/Homepage/HomeComponent";
import Spotlights from "@component/components/Homepage/Spotlights";
import Link from "next/link";
import { useSession } from "next-auth/react";
import FooterComponent from "@component/components/Footer/FooterComponent";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Act. Sing. Dance. Repeat.</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className="flex flex-col items-center overflow-x-hidden bg-slate-900 text-cyan-50">
        <Menu />
        <div
          className="flex flex-col content-center overflow-x-hidden overflow-y-hidden bg-slate-900"
          style={{ maxHeight: "120vh" }}
        >
          <div className="spotlights-container relative">
            <Spotlights />
          </div>
          {sessionData?.user && (
            <div className="mt-5 hidden w-screen justify-end pr-2 text-sm italic mobileMenu:mt-12 mobileMenu:flex mobileMenu:pr-4">
              <span>Logged in as: {sessionData.user.name}</span>
            </div>
          )}
          <div className="mt-7 w-2/3 place-self-center  2xl:mt-20">
            <h1
              className="mb-8 mt-10 text-center text-4xl font-extrabold md:text-5xl xl:text-6xl"
              style={{ animation: "pullDownTop 1s forwards 1s", opacity: 0 }}
            >
              Resources for Canadian Performers
            </h1>
            <h2
              className="flex items-center justify-center"
              style={{ animation: "fadeIn 1s forwards 2s", opacity: 0 }}
            >
              <Link href={"/about"}>
                <button className="m-3 rounded p-3 text-lg outline hover:scale-110">
                  Get Started Here
                </button>
              </Link>
            </h2>
          </div>
          <HomeComponent />
          <div className="z-30 border-2 border-red-500">
            <FooterComponent />
          </div>
          <div className="z-30 overflow-y-hidden border-2 border-purple-500">
            <div className="hidden h-96 w-full bg-slate-900 opacity-100 mobileMenu:block"></div>
            <div className="hidden h-96 w-full  bg-slate-900 opacity-100 mobileMenu:block"></div>
          </div>
        </div>
      </main> */}
      <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden bg-slate-900 text-cyan-50">
        <div className="flex flex-grow flex-col">
          <Menu />
          <Spotlights />
          {sessionData?.user && (
            <div className="mt-3 hidden justify-end pr-5 text-sm italic mobileMenu:flex ">
              <span>Logged in as: {sessionData.user.name}</span>
            </div>
          )}
          <div className="flex flex-grow flex-col justify-center">
            <div className="mt-7 w-2/3 place-self-center  3xl:mt-20">
              <h1
                className="mb-8 mt-10 text-center text-4xl font-extrabold md:text-5xl  md:max-mobileMenu:mt-0 mobileMenu:text-6xl"
                style={{ animation: "pullDownTop 1s forwards 1s", opacity: 0 }}
              >
                Resources for Canadian Performers
              </h1>
              <h2
                className="flex items-center justify-center"
                style={{ animation: "fadeIn 1s forwards 2s", opacity: 0 }}
              >
                <Link href={"/about"}>
                  <button className="m-3 rounded p-3 text-lg outline hover:scale-110 md:m-0">
                    Get Started Here
                  </button>
                </Link>
              </h2>
            </div>
            <HomeComponent />
          </div>
        </div>
        <div className="z-20">
          <FooterComponent />
        </div>
      </main>
    </>
  );
};

export default Home;
