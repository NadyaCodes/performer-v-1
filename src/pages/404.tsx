import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ShockFace from "@component/components/SingleProgramPage/ShockFace";

const Menu = dynamic(() => import("@component/components/Menu/Menu"), {
  ssr: true,
});

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

const PageNotFound: NextPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Page Not Found ~ Act. Sing. Dance. Repeat.</title>
        <meta name="description" content="Uh Oh - Page not found!" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content="Uh Oh - Page Not Found" />
        <meta
          property="og:image"
          content="https://www.actsingdancerepeat.com/ActSingDanceRepeatLogo2.png"
        />
        <meta
          name="keywords"
          content="actors, singers, dancers, musical theatre, resources, performers, canadian, merch, gifts"
        />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col justify-between overflow-hidden bg-cyan-50 bg-opacity-80">
          <div>
            <div className="bg-cyan-900 pb-5 mobileMenu:bg-cyan-50 mobileMenu:bg-opacity-80 mobileMenu:pb-0">
              <Menu />
            </div>
            <div
              className="absolute left-0 right-0 hidden h-10 bg-cyan-950 mobileMenu:block"
              style={{
                boxShadow:
                  "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
              }}
            ></div>
            <div className="h-10"></div>
            <div
              className="text-bold flex w-full flex-col content-center items-center p-3 text-center text-lg text-cyan-900 mobileMenu:mt-20"
              style={{ animation: "fadeIn 1s linear" }}
            >
              <h2 className="mx-5 flex items-center justify-center text-center text-4xl font-extrabold capitalize tracking-tight md:text-6xl  mobileMenu:my-5">
                Act. Sing. Dance. Uh Oh!
              </h2>
              <ShockFace />
              <div className="m-5">
                We&apos;re sorry, but we can&apos;t find the page you&apos;re
                looking for
              </div>
              <div className=" flex flex-row items-center justify-center">
                <button
                  onClick={() => handleGoBack()}
                  className="transform-all m-2 mr-5 rounded-md border-2 border-cyan-900 p-3 hover:bg-cyan-900 hover:text-cyan-50 hover:shadow-md hover:shadow-indigo-800"
                >
                  Go Back
                </button>
                <div>or</div>
                <Link
                  href="/"
                  className="transform-all m-2 ml-5 rounded-md border-2 border-cyan-900 p-3 hover:bg-cyan-900 hover:text-cyan-50 hover:shadow-md hover:shadow-indigo-800"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
