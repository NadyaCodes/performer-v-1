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

  return (
    <div className="min-h-screen pb-20">
      <LogoTicker />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function (s, e, n, d, er) {
          s['Sender'] = er;
          s[er] = s[er] || function () {
            (s[er].q = s[er].q || []).push(arguments)
          }, s[er].l = 1 * new Date();
          var a = e.createElement(n),
              m = e.getElementsByTagName(n)[0];
          a.async = 1;
          a.src = d;
          m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://cdn.sender.net/accounts_resources/universal.js', 'sender');
        sender('2fab698c039070');
        `,
        }}
      />

      <div className="m-auto flex w-11/12 justify-around pt-10 text-cyan-800">
        <div
          className="mt-10 flex w-full justify-around"
          style={{ animation: "fadeInTranslate 1s linear forwards" }}
        >
          <div className="flex h-32 flex-col items-center">
            <div
              onClick={() => setShowEmail(!showEmail)}
              className="mb-3 flex h-16 w-80 cursor-pointer items-center justify-center rounded border-2 border-cyan-700 px-4 py-2 text-lg font-bold hover:scale-110"
            >
              <div className="m-3 scale-90">{sparkles}</div>Email Us Here
              <div className="m-3 scale-90 -scale-x-100">{sparkles}</div>
            </div>
            {showEmail && (
              <LinkDrop
                website={"ActSingDanceRepeat@gmail.com"}
                link="mailto:actsingdancerepeat@gmail.com"
              />
            )}
          </div>
          <div
            className="flex w-2/5 flex-col items-center opacity-0"
            style={{ animation: "fadeInTranslate 1s linear .2s forwards" }}
          >
            <div className="flex h-32 flex-col items-center">
              <div
                onClick={() => setShowSubscribe(!showSubscribe)}
                className="flex h-16 w-80 cursor-pointer items-center justify-center rounded border-2 border-cyan-700 px-4 py-2 text-lg font-bold hover:scale-110"
              >
                <div className="m-3">{envelope}</div>Subscribe
                <div className="m-3">{envelope}</div>
              </div>
            </div>
            <div
              className={`${
                showSubscribe
                  ? "rounded-xl shadow-lg shadow-cyan-800"
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
                className="mb-3 flex h-16 w-80 cursor-pointer items-center justify-center rounded border-2 border-cyan-700 px-4 py-2 text-lg font-bold hover:scale-110"
              >
                <div className="m-3">{outlineStar}</div>Recommend Program
                <div className="m-3">{outlineStar}</div>
              </div>
              {showProgramForm && (
                <div className="">
                  <LinkDrop
                    website={"This will be something"}
                    link="This will be something"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
