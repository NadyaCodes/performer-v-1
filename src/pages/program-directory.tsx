import React from "react";
import Picker from "@component/components/ProgramDirectory/Picker";
import { styles } from "@component/data/constants";
import Menu from "@component/components/Menu/Menu";
import Face from "@component/components/ProgramDirectory/Face";
import Head from "next/head";
import FooterComponent from "@component/components/Footer/FooterComponent";

export default function ProgramDirectory() {
  return (
    <>
      <Head>
        <title>Program Directory ~ Act. Sing. Dance. Repeat.</title>
        <meta
          name="description"
          content="Directory of Post-Secondary-Level training options in Canada for Acting, Singing, Dance and Musical Theatre"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="og:title"
          content="Program Directory ~ Act. Sing. Dance. Repeat."
        />
        <meta property="og:image" content="https://flic.kr/p/2p3RK3i" />
        <meta
          name="keywords"
          content="actors, singers, dancers, musical theatre, resources, performers, canadian"
        />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col justify-between bg-cyan-50 bg-opacity-80 text-cyan-900">
          <div>
            <Menu />
            <div
              className="absolute left-0 right-0 hidden h-10 mobileMenu:block"
              style={{
                boxShadow:
                  "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
              }}
            ></div>
            <div className="mb-10 hidden h-10 bg-cyan-950 mobileMenu:block"></div>
          </div>
          <div className="flex w-full flex-col items-center overflow-x-hidden">
            <h1
              className="mx-10 mt-3 w-9/12 text-center text-5xl font-extrabold tracking-tight md:mt-10 md:text-6xl"
              style={{ animation: "pullDownTop 1s ease-in-out" }}
            >
              What Kind of Program are you Looking For?
            </h1>
            <div
              className="m-8 h-2 w-10/12 rounded bg-indigo-900 bg-opacity-90 opacity-0"
              style={{ animation: "flyInFadeIn .3s ease-in-out 1s forwards" }}
            ></div>
            <div
              className="m-10 w-11/12 max-w-3xl place-self-center rounded-lg bg-gradient-to-b from-cyan-600 to-cyan-900 p-5 text-cyan-50 opacity-0 shadow-xl shadow-cyan-700 md:mb-16"
              style={{
                animation: "fadeInGrow .8s ease-in-out 1.3s forwards",
              }}
            >
              <Picker buttonOptions={styles} currentLink="" last={false} />
            </div>
            <div className="-mt-16 hidden md:block">
              <Face eyesClass="eyesUp" />
            </div>
          </div>
          <div className="mt-10">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
  );
}
