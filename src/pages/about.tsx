import { type NextPage } from "next";
import Head from "next/head";
import AboutComponent from "@component/components/About/AboutComponent";
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

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About ~ Act. Sing. Dance. Repeat.</title>
        <meta
          name="description"
          content="About Act. Sing. Dance. Repeat. - A resource for Canadian actors, singers, dancers and musical theatre performers"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content="About ~ Act. Sing. Dance. Repeat." />
        <meta
          property="og:image"
          content="https://www.actsingdancerepeat.com/ActSingDanceRepeatLogo2.png"
        />
        <meta
          name="keywords"
          content="actors, singers, dancers, musical theatre, resources, performers, canadian"
        />
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
