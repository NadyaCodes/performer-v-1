import { type NextPage } from "next";
import Head from "next/head";
import Menu from "@component/components/Menu/Menu";
import HomeComponent from "@component/components/Homepage/HomeComponent";
import Link from "next/link";
import FooterComponent from "@component/components/Footer/FooterComponent";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home - Act. Sing. Dance. Repeat.</title>
        <meta
          name="description"
          content="Resources for Canadian Actors, Singers, Dancers and Musical Theatre Performers"
        />
        <meta name="og:title" content="Home - Act. Sing. Dance. Repeat." />
        <meta property="og:image" content="https://flic.kr/p/2p3RK3i" />
        <meta
          name="keywords"
          content="actors, singers, dancers, musical theatre, resources, performers, canadian"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden bg-slate-900 text-cyan-50">
        <div className="flex flex-grow flex-col">
          <Menu />
          <div className="flex flex-grow flex-col justify-center 3xl:justify-around">
            <div className="w-2/3 place-self-center mobileMenu:mt-7">
              <h1
                className="mb-8 mt-5 text-center text-4xl font-extrabold md:max-mobileMenu:mt-0  mobileMenu:text-6xl 3xl:text-8xl 4xl:m-20"
                style={{ animation: "pullDownTop 1s forwards 1s", opacity: 0 }}
              >
                Resources for Canadian Performers
              </h1>
              <h2
                className="flex items-center justify-center"
                style={{ animation: "fadeIn 1s forwards 2s", opacity: 0 }}
              >
                <Link href={"/about"}>
                  <button className="rounded p-3 text-lg outline hover:scale-110 3xl:p-6 3xl:text-2xl">
                    Get Started Here
                  </button>
                </Link>
              </h2>
            </div>
            <HomeComponent />
          </div>
        </div>
        <div className="z-20">
          <FooterComponent bgColor="bg-slate-900" />
        </div>
      </main>
    </>
  );
};

export default Home;
