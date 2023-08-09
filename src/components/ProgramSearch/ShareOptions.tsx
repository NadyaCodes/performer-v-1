import React, { SetStateAction, Dispatch } from "react";
import { ProgramWithInfo } from "./types";
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
    <div className="flex -translate-y-1 flex-col items-center">
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
            <FacebookIcon size={32} round />
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
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>

      <div
        className="w-fit text-cyan-700 opacity-0 transition-all hover:scale-110"
        style={{ animation: "flyInRight 0.7s linear 0.4s forwards" }}
      >
        <div className="m-0.5 flex rounded-full hover:scale-105 hover:shadow-xl hover:shadow-slate-500">
          <FacebookMessengerShareButton appId={""} url={programUrl}>
            <FacebookMessengerIcon size={32} round />
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
            body={`${program.schoolObj?.name.toUpperCase()} has a program you might like! Check it out on Act Sing Dance Repeat here:`}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>

      <div
        onClick={() => setShare(false)}
        className="m-0.5 cursor-pointer opacity-0 transition-all"
        style={{ animation: "flyInRight 0.7s linear 0.8s forwards" }}
      >
        <div className="m-0.5 rounded-full border-2 border-pink-300 p-0.5 text-pink-500 hover:scale-110 hover:shadow-md hover:shadow-slate-500">
          {xMark}
        </div>
      </div>
    </div>
  );
}
