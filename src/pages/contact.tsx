import ContactComponent from "@component/components/Contact/ContactComponent";
import Menu from "@component/components/Menu/Menu";
import React from "react";
import Head from "next/head";
import FooterComponent from "@component/components/Footer/FooterComponent";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact ~ Act. Sing. Dance. Repeat.</title>
        <meta
          name="description"
          content="Contact for Act. Sing. Dance. Repeat."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col justify-between bg-slate-900">
          <div>
            <Menu />
            <ContactComponent />
          </div>

          <div className="mt-10">
            <FooterComponent bgColor="bg-slate-900" />
          </div>
        </div>
      </main>
    </>
  );
}
