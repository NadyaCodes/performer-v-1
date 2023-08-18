import React, { useState, useEffect } from "react";
import { disciplines } from "@component/data/constants";

export default function Hero() {
  const [featuredText, setFeaturedText] = useState<string>("");
  const [animateLight, setAnimateLight] = useState<boolean>(true);

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

  useEffect(() => {
    setTimeout(() => {
      setAnimateLight(false);
    }, 4000);
  }, []);

  return (
    <div className="">
      <div className="mx-10 mt-3 flex h-40 flex-col place-items-center justify-center bg-slate-950 shadow-2xl shadow-cyan-400 lg:mx-32 lg:mt-10 lg:h-60">
        <div className="">
          {featuredText === "act" && (
            <div
              className="hero-phrase m-5 text-3xl font-extrabold md:text-5xl xl:text-7xl"
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
              className="hero-phrase m-5 text-3xl font-extrabold  md:text-5xl xl:text-7xl"
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
              className="hero-phrase m-5 text-3xl font-extrabold md:text-5xl xl:text-7xl"
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
              className="hero-phrase m-5 w-40 p-2 text-center text-3xl font-extrabold sm:w-auto md:text-5xl xl:text-7xl"
              style={{
                animation: "flyInOut 2.9s ease-in",
                willChange: "transform",
              }}
            >
              MUSICAL THEATRE
            </div>
          )}
        </div>
      </div>
      <div className="relative mx-20 flex justify-around">
        <div
          className="h-5 w-7 overflow-hidden rounded-t-full bg-black shadow-cyan-100 sm:h-8 sm:w-12"
          style={{
            animation: animateLight
              ? "fadeInShadow .4s ease-in 2s forwards"
              : "",
            boxShadow: !animateLight
              ? "1px -40px 40px 40px rgba(207, 250, 254, 1)"
              : "",
          }}
        ></div>
        <div
          className="h-5 w-7 overflow-hidden rounded-t-full bg-black shadow-cyan-100 sm:h-8 sm:w-12"
          style={{
            animation: animateLight
              ? "fadeInShadow .4s ease-in 2s forwards"
              : "",
            boxShadow: !animateLight
              ? "1px -40px 40px 40px rgba(207, 250, 254, 1)"
              : "",
          }}
        ></div>
        <div
          className="h-5 w-7 overflow-hidden rounded-t-full bg-black shadow-cyan-100 sm:h-8 sm:w-12"
          style={{
            animation: animateLight
              ? "fadeInShadow .4s ease-in 2s forwards"
              : "",
            boxShadow: !animateLight
              ? "1px -40px 40px 40px rgba(207, 250, 254, 1)"
              : "",
          }}
        ></div>
        <div
          className="hidden h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100 md:block"
          style={{
            animation: animateLight
              ? "fadeInShadow .4s ease-in 2s forwards"
              : "",
            boxShadow: !animateLight
              ? "1px -40px 40px 40px rgba(207, 250, 254, 1)"
              : "",
          }}
        ></div>
      </div>
      <div className="w-fill relative z-10 h-96 bg-slate-900"></div>
    </div>
  );
}
