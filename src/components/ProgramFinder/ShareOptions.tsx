import React, { type SetStateAction, type Dispatch } from "react";
import type { ProgramWithInfo } from "./types";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailIcon,
  EmailShareButton,
} from "next-share";
import { xMark } from "@component/data/svgs";

export default function ShareOptions({
  program,
  setShare,
}: {
  program: ProgramWithInfo;
  setShare: Dispatch<SetStateAction<boolean>>;
}) {
  const programUrl = `https://www.localhost:3000/single-program/${program.id}`;
  return (
    <div className="flex flex-row items-center md:-translate-y-1 lg:-translate-x-8 lg:flex-col 2xl:-translate-x-3">
      <div
        className="w-fit text-cyan-700 opacity-0 transition-all hover:scale-105"
        style={{ animation: "flyInRight 0.7s linear forwards" }}
      >
        <div className="m-0.5 flex rounded-full hover:scale-110 hover:shadow-xl hover:shadow-slate-500">
          <FacebookShareButton
            url={programUrl}
            quote={
              "Check out this cool program I found on Act Sing Dance Repeat!"
            }
            hashtag={"#ActSingDanceRepeat"}
          >
            <div style={{ filter: "hue-rotate(20deg)" }}>
              <FacebookIcon size={32} round />
            </div>
          </FacebookShareButton>
        </div>
      </div>
      <div
        className="w-fit text-cyan-700 opacity-0 transition-all hover:scale-110"
        style={{ animation: "flyInRight 0.7s linear 0.2s forwards" }}
      >
        <div className="m-0.5 flex rounded-full hover:scale-110 hover:shadow-xl hover:shadow-slate-500">
          <WhatsappShareButton
            url={programUrl}
            title={
              "Check out this cool program I found on Act Sing Dance Repeat!"
            }
            separator=":: "
          >
            <div style={{ filter: "hue-rotate(70deg)" }}>
              <WhatsappIcon size={32} round />
            </div>
          </WhatsappShareButton>
        </div>
      </div>

      <div
        className="w-fit text-cyan-700 opacity-0 transition-all hover:scale-110"
        style={{ animation: "flyInRight 0.7s linear 0.4s forwards" }}
      >
        <div className="m-0.5 flex rounded-full hover:scale-105 hover:shadow-xl hover:shadow-slate-500">
          <FacebookMessengerShareButton appId={""} url={programUrl}>
            <div style={{ filter: "hue-rotate(320deg)" }}>
              <FacebookMessengerIcon size={32} round />
            </div>
          </FacebookMessengerShareButton>
        </div>
      </div>
      <div
        className="w-fit text-cyan-700 opacity-0 transition-all"
        style={{ animation: "flyInRight 0.7s linear 0.6s forwards" }}
      >
        <div className=" m-0.5 flex rounded-full hover:scale-110 hover:shadow-xl hover:shadow-slate-500">
          <EmailShareButton
            url={programUrl}
            subject={
              "Check out this cool program I found on Act Sing Dance Repeat!"
            }
            body={`${
              program.schoolObj?.name.toUpperCase() + " has " || "Here is "
            }a program you might like! Check it out on Act Sing Dance Repeat here:`}
          >
            <div style={{ filter: "sepia(100%) hue-rotate(230deg)" }}>
              <EmailIcon size={32} round />
            </div>
          </EmailShareButton>
        </div>
      </div>

      <div
        onClick={() => setShare(false)}
        className="m-0.5 cursor-pointer opacity-0 transition-all"
        style={{ animation: "flyInRight 0.7s linear 0.8s forwards" }}
      >
        <div className="m-0.5 rounded-full border-2 border-rose-400 bg-rose-400 p-0.5 text-rose-100 hover:scale-110 hover:shadow-md hover:shadow-slate-500">
          {xMark}
        </div>
      </div>
    </div>
  );
}
