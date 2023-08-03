import React, { useState, useEffect } from "react";
import { disciplines } from "@component/data/constants";

export default function Hero() {
  const [featuredText, setFeaturedText] = useState<string>(
    disciplines[0] || "act"
  );

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
      setFeaturedText(disciplines[1] || "sing");
    }, 3000);
  }, []);

  return (
    <div>
      <div className="m-20 flex flex-col place-items-center bg-teal-950 p-3 shadow-2xl shadow-cyan-300">
        {featuredText === "act" && (
          <div
            className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
            style={{
              animation: "flyInOut 2.9s ease-in",
              willChange: "transform",
            }}
          >
            ACT
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
            SING
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
      <div className="relative flex justify-around">
        <div
          className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100"
          style={{ boxShadow: "1px -50px 50px 50px #cffafe" }}
        ></div>
        <div
          className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100"
          style={{ boxShadow: "1px -50px 50px 50px #cffafe" }}
        ></div>
        <div
          className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100"
          style={{ boxShadow: "1px -50px 50px 50px #cffafe" }}
        ></div>
        <div
          className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100"
          style={{ boxShadow: "1px -50px 50px 50px #cffafe" }}
        ></div>
      </div>
      <div className="w-fill relative z-10 h-8 bg-teal-950"></div>
    </div>
  );
}

// -webkit-box-shadow: 1px -50px 50px 50px rgba(0,0,0,0.56);
// box-shadow: 1px -50px 50px 50px rgba(0,0,0,0.56);

// .ticker-text {
//   animation: ticker 20s linear infinite;
//   white-space: nowrap;
//   padding-right: 1rem; /* Add some spacing between the repeated text */
// }
