import React, { useState, useEffect } from "react";

export default function ScrollingDivide() {
  const [translateX, setTranslateX] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("divide-line");
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        const halfHeight = windowHeight / 2;

        if (rect.top >= 0 && rect.bottom <= windowHeight) {
          if (rect.top > halfHeight) {
            setTranslateX(((rect.top - halfHeight) / 10) * -1);
          } else {
            setTranslateX(((rect.top - halfHeight) / 10) * -1);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className="flex w-full justify-center opacity-0"
      style={{ animation: "flyInFadeIn 1s linear .5s forwards" }}
    >
      <div
        className="my-12 hidden h-2 w-2/3 rounded-full bg-gradient-to-b  from-cyan-700 to-indigo-800 shadow-md shadow-indigo-900 mobileMenu:block"
        style={{
          transition: "width 0.3s",
          transform: `translateX(${translateX}%)`,
        }}
        id="divide-line"
      ></div>
      <div
        className="my-12 h-2 w-5/6 rounded-full bg-gradient-to-b  from-cyan-700 to-indigo-800 shadow-md shadow-indigo-900 mobileMenu:hidden"
        id="divide-line"
      ></div>
    </div>
  );
}
