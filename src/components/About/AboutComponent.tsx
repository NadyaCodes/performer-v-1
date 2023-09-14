import React, { useEffect, useState } from "react";
import LogoTicker from "./LogoTicker";
import { arrowDown } from "@component/data/svgs";
import Link from "next/link";
import ScrollArrow from "../ProgramFinder/ScrollArrow";

export default function AboutComponent() {
  const [appearBox, setAppearBox] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
    box5: false,
    box6: false,
    box7: false,
  });

  const makeBoxesAppear = () => {
    const boxArray = ["box1", "box2", "box3", "box4", "box5", "box6", "box7"];
    const offsetBottom = 100;

    boxArray.forEach((box) => {
      const boxElement = document.getElementById(box);
      if (boxElement) {
        const boxTop = boxElement.getBoundingClientRect().top;
        const boxBottom = boxElement.getBoundingClientRect().bottom;
        if (boxTop <= window.innerHeight - offsetBottom && boxBottom >= 0) {
          setAppearBox((prevState) => ({ ...prevState, [box]: true }));
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", makeBoxesAppear);
    return () => {
      window.removeEventListener("scroll", makeBoxesAppear);
    };
  }, []);

  return (
    <div className="max-w-full">
      <div className="mb-10 flex max-w-full flex-col items-center">
        <div
          className="flex flex-col items-center justify-between overflow-x-hidden"
          style={{ height: "74vh", maxWidth: "100vw" }}
        >
          <div className="w-screen">
            <div className="hidden mobileMenu:block">
              <LogoTicker />
            </div>
          </div>
          <h1 className="hidden flex-col text-center text-3xl font-extrabold mobileMenu:flex xl:text-5xl 3xl:text-6xl">
            <span>Looking for Professonal Post-Secondary Training</span>
            <span>in Acting, Singing, Dance or Musical Theatre</span>
            <span className="scale-125 pt-6">&#8230;in Canada?</span>
          </h1>
          <h1 className="flex flex-col text-center text-3xl font-extrabold xs:text-4xl md:text-5xl mobileMenu:hidden">
            <span>Looking for</span>
            <span>Professonal Post-Secondary</span>
            <span>Training in</span>
            <span>Acting, Singing, Dance,</span>
            <span> or Musical Theatre</span>
            <span className="scale-125 pt-6">&#8230;in Canada?</span>
          </h1>

          <div className="font-2 flex flex-col text-center text-3xl font-extrabold text-cyan-900 xs:text-3xl 2xl:text-5xl">
            You&apos;ve come to the right place!
          </div>
          <div className="flex w-11/12 -translate-y-3 scale-75 justify-between text-2xl text-cyan-950 sm:w-9/12 sm:scale-100 mobileMenu:w-7/12 2xl:scale-125">
            <span style={{ animation: "upDown 1.5s linear infinite" }}>
              {arrowDown}
            </span>
            <span style={{ animation: "upDown 1.5s linear .3s infinite" }}>
              {arrowDown}
            </span>
            <span style={{ animation: "upDown 1.5s linear  .6s infinite" }}>
              {arrowDown}
            </span>
          </div>
        </div>

        <div
          className="mb-10 mt-3 flex w-11/12 flex-col items-center overflow-hidden rounded-lg border-2 border-cyan-200 opacity-0 shadow-xl shadow-cyan-700 md:w-10/12 xl:w-8/12 xl:text-lg 2xl:w-6/12"
          style={{
            animation: appearBox.box1 ? "fadeInGrow 1.5s ease-in forwards" : "",
          }}
          id="box1"
        >
          <Link href="/program-finder" className="w-full">
            <div className="w-full bg-cyan-100 p-5 text-center text-2xl font-bold">
              Program Finder
            </div>
            <div className="flex w-full flex-col p-4 md:p-10">
              <span>
                Search for programs by selecting the filters you want.
              </span>
              <span className="mb-2">Filter results by:</span>
              <ul className="list-outside list-disc px-8 py-2 italic">
                <li>Full Time vs. Part Time</li>
                <li>Acting, Singing, Dance, Musical Theatre</li>
                <li>Location</li>
                <li>Keywords</li>
              </ul>
              <span>Helps you find your ideal program!</span>
            </div>
          </Link>
        </div>

        <div
          className="mb-10 flex w-11/12 flex-col items-center overflow-hidden rounded-lg border-2 border-cyan-200 opacity-0 shadow-xl shadow-cyan-700 md:w-10/12 xl:w-8/12 xl:text-lg 2xl:w-6/12"
          style={{
            animation: appearBox.box2 ? "fadeInGrow 1.5s ease-in forwards" : "",
          }}
          id="box2"
        >
          <Link href="/program-directory" className="w-full">
            <div className="w-full bg-cyan-100 p-5 text-center text-2xl font-bold">
              Program Directory
            </div>
            <div className="flex w-full flex-col p-4 md:p-10">
              <span className="mb-2">
                Directory of post-secondary-level performance training programs
                in Canada
              </span>
              <span>Alternative to the Program Finder</span>
            </div>
          </Link>
        </div>

        <div
          className="mb-10 flex w-11/12 flex-col items-center overflow-hidden rounded-lg border-2 border-cyan-200 opacity-0 shadow-xl shadow-cyan-700 md:w-10/12 xl:w-8/12 xl:text-lg 2xl:w-6/12"
          style={{
            animation: appearBox.box3 ? "fadeInGrow 1.5s ease-in forwards" : "",
          }}
          id="box3"
        >
          <Link href="/my-programs" className="w-full">
            <div className="w-full bg-cyan-100 p-5 text-center text-2xl font-bold">
              My Programs
            </div>
            <div className="flex w-full flex-col p-4 md:p-10">
              <span className="mb-2">
                Create a free account (via Google sign-in), and you can select
                and save your favourite programs from the Finder and Directory.
              </span>
              <span>
                Add programs to your faves by clicking the purple star icon on
                the listing.
              </span>
            </div>
          </Link>
        </div>

        <div
          className="mb-10 flex w-11/12 flex-col items-center overflow-hidden rounded-lg border-2 border-cyan-200 opacity-0 shadow-xl shadow-cyan-700 md:w-10/12 xl:w-8/12 xl:text-lg 2xl:w-6/12"
          style={{
            animation: appearBox.box4 ? "fadeInGrow 1.5s ease-in forwards" : "",
          }}
          id="box4"
        >
          <Link href="/my-programs" className="w-full">
            <div className="w-full bg-cyan-100 p-5 text-center text-2xl font-bold">
              Notes and Custom Programs (via My Programs)
            </div>
            <div className="flex w-full flex-col p-4 md:p-10">
              <span className="mb-2">
                Patreon subscribers unlock the ability to save custom programs
                and add private notes to each program in your faves list.
              </span>
              <span>
                Keep notes such as application deadlines, audition requirements,
                and even your international school details all in one simple
                location!
              </span>
            </div>
          </Link>
        </div>

        <div
          className="mb-10 flex w-11/12 flex-col items-center overflow-hidden rounded-lg border-2 border-cyan-200 opacity-0 shadow-xl shadow-cyan-700 md:w-10/12 xl:w-8/12 xl:text-lg 2xl:w-6/12"
          style={{
            animation: appearBox.box5 ? "fadeInGrow 1.5s ease-in forwards" : "",
          }}
          id="box5"
        >
          <Link href="/patreon" className="w-full">
            <div className="w-full bg-cyan-100 p-5 text-center text-2xl font-bold">
              Patreon
            </div>
            <div className="flex w-full flex-col p-4 md:p-10">
              <span className="mb-2">
                This site uses Patreon, a monthly subscription service, to help
                fund the continued maintenance and the hopeful expansion of this
                platform
              </span>
              <ul className="list-outside list-disc px-8 py-2 italic">
                <li>
                  Artists/Students can use it to unlock special features on the
                  site
                </li>
                <li>Schools/Programs can use it to upgrade their listings</li>
              </ul>
              <span className="mb-2">
                After covering basic running costs, any additional income will
                go towards adding more content and opportunities for subscribers
              </span>
            </div>
          </Link>
        </div>

        <div
          className="mb-10 flex w-11/12 flex-col items-center overflow-hidden rounded-lg border-2 border-cyan-200 opacity-0 shadow-xl shadow-cyan-700 md:w-10/12 xl:w-8/12 xl:text-lg 2xl:w-6/12"
          style={{
            animation: appearBox.box6 ? "fadeInGrow 1.5s ease-in forwards" : "",
          }}
          id="box6"
        >
          <Link href="/merch" className="w-full">
            <div className="w-full bg-cyan-100 p-5 text-center text-2xl font-bold">
              Merch
            </div>
            <div className="flex w-full flex-col p-4 md:p-10">
              <span className="mb-2">Yes, there is merch.</span>
              <span className="mb-2">Because why not???</span>
            </div>
          </Link>
        </div>

        <div
          className="mb-10 flex w-11/12 flex-col items-center overflow-hidden rounded-lg border-2 border-red-200 opacity-0 shadow-lg shadow-red-300 md:w-10/12 xl:w-8/12 xl:text-lg 2xl:w-6/12"
          style={{
            animation: appearBox.box7 ? "fadeInGrow 1.5s ease-in forwards" : "",
          }}
          id="box7"
        >
          <div className="w-full  bg-red-100 p-3 text-center text-2xl font-bold">
            DISCLAIMER
          </div>
          <div className="flex flex-col p-4 md:p-10">
            <span className="m-2">
              Programs have mostly been compiled by a very obsessive Google
              search process done by a single human being.
            </span>
            <span className="m-2">
              Though every effort has been made, this directory is not perfectly
              exhaustive.
            </span>
            <span className="m-2">
              If you know of any programs that are not on this list, or if any
              information should be updated, please submit them via the{" "}
              <Link
                href={"/contact"}
                target="_blank"
                className=" text-cyan-600 underline"
              >
                contact page.
              </Link>
            </span>
            <span className="m-2 font-bold italic">
              Please note the following program requirements:
            </span>
            <ul className="list-outside list-disc px-8 py-2 italic">
              <li>
                Programs/Classes <strong>MUST</strong> be available for students
                aged 18+
              </li>
              <li>
                To be considered full-time, a program must be at least 3 months
                long, with full-length work-days
              </li>
              <li>
                Teachers of private lessons/coachings are more than welcome in
                the part-time list, as long as they are comfortable with
                teaching adults with professional aspirations
              </li>
            </ul>
          </div>
        </div>
        <ScrollArrow color="cyan" />
      </div>
    </div>
  );
}
