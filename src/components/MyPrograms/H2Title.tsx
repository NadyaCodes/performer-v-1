import React from "react";
import { sparkles, outlineStar } from "@component/data/svgs";

export default function H2Title({
  text,
  icon,
}: {
  text: string;
  icon: string;
}) {
  return (
    <>
      <h2 className="m-5 flex w-7/12 scale-125  items-center justify-center bg-cyan-50  text-center  text-4xl font-extrabold capitalize tracking-tight text-cyan-900">
        <div style={{ animation: "wiggle .4s linear 5" }}>
          <div style={{ animation: "fadeInGrow 3s linear" }}>
            <div className="m-2">
              {icon === "sparkle" ? sparkles : outlineStar}
            </div>
          </div>
        </div>
        <div className="m-2">{text}</div>
        <div style={{ animation: "wiggle .4s linear 5" }}>
          <div style={{ animation: "fadeInGrow 3s linear" }}>
            <div className="m-2 -scale-x-100">
              {icon === "sparkle" ? sparkles : outlineStar}
            </div>
          </div>
        </div>
      </h2>
      <div
        className="h-1 w-2/3 justify-center rounded-full bg-gradient-to-b from-cyan-300 to-cyan-900 text-cyan-950 opacity-0 shadow-lg shadow-cyan-900"
        style={{ animation: "flyInFadeIn 0.5s linear 2.5s forwards" }}
      ></div>
      <div className="h-10"></div>
    </>
  );
}
