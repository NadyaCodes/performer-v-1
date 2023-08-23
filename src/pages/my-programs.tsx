import Menu from "@component/components/Menu/Menu";
import MyProgramsComponent from "@component/components/MyPrograms/MyProgramsComponent";
import React from "react";
import Head from "next/head";

export default function MyPrograms() {
  return (
    <>
      <Head>
        <title>My Programs ~ Act. Sing. Dance. Repeat.</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen bg-cyan-50 bg-opacity-80">
          <Menu />
          <MyProgramsComponent />
        </div>
      </main>
    </>
  );
}
