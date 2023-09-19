import type { NextPage } from "next";
import Menu from "@component/components/Menu/Menu";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import FooterComponent from "@component/components/Footer/FooterComponent";

const Merch: NextPage = () => {
  useEffect(() => {
    confetti({
      colors: [
        "#22d3ee",
        "#a5f3fc",
        "#0891b2",
        "#a5b4fc",
        "#6366f1",
        "#4338ca",
        "#fde047",
      ],
      particleCount: 30,
      startVelocity: 40,
      spread: 90,
    })?.catch((error) => console.error("Confetti error: ", error));
  }, []);

  return (
    <>
      <Head>
        <title>Merch ~ Act. Sing. Dance. Repeat.</title>
        <meta name="description" content="Merch - Act. Sing. Dance. Repeat." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col justify-between overflow-hidden bg-cyan-50 bg-opacity-80">
          <div>
            <Menu />
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
                Act. Sing. Dance. Merch.
              </h2>
              <a
                href="https://actsingdancerepeat.threadless.com/"
                className="mx-3 my-10 rounded-full border-4 border-cyan-800 p-6 font-semibold shadow-md shadow-indigo-300 transition-all hover:scale-105 hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-900"
                target="_blank"
              >
                Check Out Our Merch on Threadless
              </a>
              <div className="my-8 flex w-11/12 flex-col items-center transition-all mobileMenu:my-16 mobileMenu:scale-100">
                <div className="z-10 flex justify-around transition-all mobileMenu:w-full mobileMenu:justify-between xl:justify-around">
                  <div
                    style={{
                      animation: "fadeInFallInFromTop 1s linear forwards",
                    }}
                  >
                    <div
                      className="overflow-hidden rounded-lg border border-cyan-800 shadow-lg shadow-cyan-800 transition-all mobileMenu:-mt-10 mobileMenu:border-2"
                      style={{ transform: "rotate(-20deg)" }}
                    >
                      <Image
                        src="/act-sing-dance-repeat-t-mens.png"
                        alt="Act Sing Dance Repeat Mens T-Shirt"
                        width={375}
                        height={375}
                      />
                    </div>
                  </div>
                  <div
                    className="opacity-0 transition-all"
                    style={{
                      animation: "fadeInFallInFromTop 1s linear 0.4s forwards",
                    }}
                  >
                    <div
                      className="overflow-hidden rounded-lg border border-cyan-800 shadow-lg shadow-cyan-800 transition-all mobileMenu:-mt-10 mobileMenu:border-2"
                      style={{ transform: "rotate(20deg)" }}
                    >
                      <Image
                        src="/act-sing-dance-repeat-ladies-hoodie.png"
                        alt="Act Sing Dance Repeat Ladies Hoodie"
                        width={375}
                        height={375}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="z-0 opacity-0 transition-all mobileMenu:z-10"
                  style={{
                    animation: "fadeInFallInFromTop 1s linear 0.2s forwards",
                  }}
                >
                  <div className="m-auto -mt-5 h-fit w-6/12 overflow-hidden rounded-lg border-2 border-cyan-800 shadow-lg shadow-cyan-800 transition-all xs:w-8/12 sm:w-9/12 md:-mt-5 md:w-11/12 md:border mobileMenu:-mt-60 mobileMenu:w-fit mobileMenu:border-2">
                    <Image
                      src="/caution-may-burst-tote.png"
                      alt="Act Sing Dance Repeat Tote Bag"
                      width={375}
                      height={375}
                    />
                  </div>
                </div>
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

export default Merch;
