import ProgramFinderComponent from "@component/components/ProgramFinder/ProgramFinderComponent";
import type { NextPage } from "next";
import Menu from "@component/components/Menu/Menu";
import Head from "next/head";
import FooterComponent from "@component/components/Footer/FooterComponent";

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
