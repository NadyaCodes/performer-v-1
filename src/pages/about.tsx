import { type NextPage } from "next";
import Head from "next/head";
import Menu from "@component/components/Menu/Menu";
import AboutComponent from "@component/components/About/AboutComponent";
import FooterComponent from "@component/components/Footer/FooterComponent";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About ~ Act. Sing. Dance. Repeat.</title>
        <meta name="description" content="About Act. Sing. Dance. Repeat." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-cyan-50 text-cyan-950">
        <Menu />
        <AboutComponent />
        <FooterComponent bgColor="bg-cyan-900" />
      </main>
    </>
  );
};

export default About;
