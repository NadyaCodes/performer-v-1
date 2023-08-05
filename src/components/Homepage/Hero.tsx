import React, { useState, useEffect } from "react";
import { disciplines } from "@component/data/constants";

export default function Hero() {
  const [featuredText, setFeaturedText] = useState<string>("");

  useEffect(() => {
    const currentIndex = disciplines.indexOf(featuredText);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % disciplines.length;
      setTimeout(() => {
        setFeaturedText(disciplines[nextIndex] || "act");
      }, 2500);
    }
  }, [featuredText]);

  useEffect(() => {
    setTimeout(() => {
      setFeaturedText(disciplines[0] || "act");
    }, 2500);
  }, []);

  return (
    <div>
      <div className="mx-32 mt-10 flex h-60 flex-col place-items-center justify-center bg-slate-950 shadow-2xl shadow-cyan-400">
        {featuredText === "act" && (
          <div
            className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
            style={{
              animation: "flyInOut 2.9s ease-in",
              willChange: "transform",
            }}
          >
            ACTING
          </div>
        )}
        {featuredText === "sing" && (
          <div
            className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
            style={{
              animation: "flyInOut 2.9s ease-in",
              willChange: "transform",
            }}
          >
            SINGING
          </div>
        )}
        {featuredText === "dance" && (
          <div
            className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
            style={{
              animation: "flyInOut 2.9s ease-in",
              willChange: "transform",
            }}
          >
            DANCE
          </div>
        )}
        {featuredText === "mt" && (
          <div
            className="hero-phrase m-5 p-2 text-5xl font-extrabold sm:text-[5rem]"
            style={{
              animation: "flyInOut 2.9s ease-in",
              willChange: "transform",
            }}
          >
            MUSICAL THEATRE
          </div>
        )}
      </div>
      <div className="relative mx-20 flex justify-around">
        <div
          className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100"
          style={{
            animation: "fadeInShadow .4s ease-in 2s forwards",
          }}
        ></div>
        <div
          className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100"
          style={{ animation: "fadeInShadow .4s ease-in 2s forwards" }}
        ></div>
        <div
          className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100"
          style={{ animation: "fadeInShadow .4s ease-in 2s forwards" }}
        ></div>
        <div
          className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100"
          style={{ animation: "fadeInShadow .4s ease-in 2s forwards" }}
        ></div>
      </div>
      <div className="w-fill relative z-10 h-96 bg-slate-900"></div>
    </div>
  );
}
