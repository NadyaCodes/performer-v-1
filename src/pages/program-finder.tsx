import ProgramFinderComponent from "@component/components/ProgramFinder/ProgramFinderComponent";
import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("@component/components/Menu/Menu"), {
  ssr: true,
});

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

const ProgramFinder: NextPage = () => {
  return (
    <>
      <Head>
        <title>Program Finder ~ Act. Sing. Dance. Repeat.</title>
        <meta
          name="description"
          content="Tool for helping emerging artists find their idea program for Acting, Singing, Dance, or Musical Theatre"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="og:title"
          content="Program Finder ~ Act. Sing. Dance. Repeat."
        />
        <meta
          property="og:image"
          content="https://www.actsingdancerepeat.com/ActSingDanceRepeatLogo2.png"
        />
        <meta
          name="keywords"
          content="actors, singers, dancers, musical theatre, resources, performers, canadian"
        />
      </Head>
      <main>
        <div className="min-h-screen bg-cyan-50 bg-opacity-80">
          <Menu />
          <ProgramFinderComponent />
          <div className="mt-5">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProgramFinder;
