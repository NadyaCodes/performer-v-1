import React, { useState } from "react";
import LogoTicker from "../About/LogoTicker";
import { envelope, outlineStar, sparkles } from "@component/data/svgs";
import LinkDrop from "./LinkDrop";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  body: string;
  subscribe: boolean;
  address: string;
};

export default function ContactComponent() {
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const [showProgramForm, setShowProgramForm] = useState<boolean>(false);
  const [showSubscribe, setShowSubscribe] = useState<boolean>(false);

  const [spotlight, setSpotlight] = useState<string>("");

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <LogoTicker />

      <div className="m-auto flex w-11/12 justify-around pt-10 text-cyan-600">
        <div
          className="mt-20 flex w-full flex-col justify-around lg:flex-row"
          style={{ animation: "fadeInTranslate 1s linear forwards" }}
        >
          <div className="flex flex-col items-center">
            <div
              onClick={() => setShowEmail(!showEmail)}
              className="flex h-16 w-80 cursor-pointer items-center justify-center rounded border-2 border-cyan-700 px-4 py-2 text-lg font-bold transition-all hover:bg-cyan-900 hover:text-cyan-50"
              onMouseOver={() => setSpotlight("email")}
              onMouseOut={() => setSpotlight("")}
            >
              <div className="m-3 scale-90">{sparkles}</div>Email Us Here
              <div className="m-3 scale-90 -scale-x-100">{sparkles}</div>
            </div>
            {showEmail && (
              <LinkDrop
                linkText={"ActSingDanceRepeat@gmail.com"}
                link="mailto:actsingdancerepeat@gmail.com"
              />
            )}
          </div>
          <div
            className="flex flex-col items-center opacity-0 lg:w-2/5"
            style={{ animation: "fadeInTranslate 1s linear .2s forwards" }}
          >
            <div className="flex flex-col items-center">
              <div
                onClick={() => setShowSubscribe(!showSubscribe)}
                className="flex h-16 w-80 cursor-pointer items-center justify-center rounded border-2 border-cyan-700 px-4 py-2 text-lg font-bold transition-all hover:bg-cyan-900 hover:text-cyan-50"
                onMouseOver={() => setSpotlight("subscribe")}
                onMouseOut={() => setSpotlight("")}
              >
                <div className="m-3">{envelope}</div>Subscribe
                <div className="m-3">{envelope}</div>
              </div>
            </div>
            <div
              className={`${
                showSubscribe
                  ? "mx-5 mb-5 mt-3 rounded-xl shadow-lg shadow-cyan-500"
                  : "hidden"
              }`}
              style={{ animation: "pullDownTop 0.5s linear forwards" }}
            >
              <div
                style={{ textAlign: "left" }}
                className="sender-form-field"
                data-sender-form-id="llfvjlgce3ng4ds98jh"
              ></div>
            </div>
          </div>
          <div
            className="flex flex-col items-center opacity-0"
            style={{ animation: "fadeInTranslate 1s linear .4s forwards" }}
          >
            <div className="flex h-32 flex-col items-center">
              <div
                onClick={() => setShowProgramForm(!showProgramForm)}
                className="mb-3 flex h-16 w-80 cursor-pointer items-center justify-center rounded border-2 border-cyan-700 px-4 py-2 text-lg font-bold transition-all hover:bg-cyan-900 hover:text-cyan-50"
                onMouseOver={() => setSpotlight("form")}
                onMouseOut={() => setSpotlight("")}
              >
                <div className="m-3">{outlineStar}</div>Recommend Program
                <div className="m-3">{outlineStar}</div>
              </div>
              {showProgramForm && (
                <div className="">
                  <LinkDrop
                    linkText={"Fill out our form here!"}
                    link="https://docs.google.com/forms/d/e/1FAIpQLScOcWMUyQKki7mg4DJQn2CWE7WOFYLA9zY_q3cyv_BHAzP_NQ/viewform?usp=sf_link"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        {!showSubscribe && (
          <>
            <div className="relative mx-20 mt-5 flex justify-around">
              <div
                className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100 transition-all"
                style={{
                  animation:
                    spotlight === "email" && !showEmail
                      ? "fadeInShadow 0.4s ease-in forwards"
                      : "none",
                  visibility: showEmail ? "hidden" : "visible",
                }}
              ></div>
              <div
                className=" mx-48 h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100 transition-all"
                style={{
                  animation:
                    spotlight === "subscribe"
                      ? "fadeInShadow 0.4s ease-in forwards"
                      : "none",
                }}
              ></div>
              <div
                className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100 transition-all"
                style={{
                  animation:
                    spotlight === "form" && !showProgramForm
                      ? "fadeInShadow 0.4s ease-in forwards"
                      : "none",
                  visibility: showProgramForm ? "hidden" : "visible",
                }}
              ></div>
            </div>
          </>
        )}
        <div className="w-fill relative z-10 h-96 bg-slate-900"></div>
      </div>
    </div>
  );
}
