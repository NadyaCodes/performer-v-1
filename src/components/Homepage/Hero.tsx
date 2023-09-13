import React, { useState, useEffect } from "react";
import { disciplines } from "@component/data/constants";
import BigLights from "./BigLights";
import SmallLights from "./SmallLights";

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
    <div className="flex flex-col bg-slate-900">
      <div className="mx-10 mt-3 flex h-40 flex-col place-items-center justify-center bg-slate-950 shadow-2xl shadow-cyan-400 md:h-60 md:max-lg:mx-16 lg:mx-32 lg:mt-10 lg:h-60 2xl:h-96">
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
      <div className="relative mx-20 hidden justify-around lg:flex">
        <BigLights animateLight={animateLight} />
      </div>
      <div className="relative mx-20 flex justify-around lg:hidden">
        <SmallLights animateLight={animateLight} />
      </div>
      <div className="z-20 h-10 w-full bg-slate-900 opacity-100 mobileMenu:h-20"></div>
    </div>
  );
}
