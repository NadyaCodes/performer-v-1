import React from "react";

export default function BigLights({ animateLight }: { animateLight: boolean }) {
  return (
    <>
      <div
        className="h-5 w-7 overflow-hidden rounded-t-full bg-black shadow-cyan-100 sm:h-8 sm:w-12"
        style={{
          animation: animateLight ? "fadeInShadow .4s ease-in 2s forwards" : "",
          boxShadow: !animateLight
            ? "1px -40px 40px 40px rgba(207, 250, 254, 1)"
            : "",
        }}
      ></div>
      <div
        className="h-5 w-7 overflow-hidden rounded-t-full bg-black shadow-cyan-100 sm:h-8 sm:w-12"
        style={{
          animation: animateLight ? "fadeInShadow .4s ease-in 2s forwards" : "",
          boxShadow: !animateLight
            ? "1px -40px 40px 40px rgba(207, 250, 254, 1)"
            : "",
        }}
      ></div>
      <div
        className="h-5 w-7 overflow-hidden rounded-t-full bg-black shadow-cyan-100 sm:h-8 sm:w-12"
        style={{
          animation: animateLight ? "fadeInShadow .4s ease-in 2s forwards" : "",
          boxShadow: !animateLight
            ? "1px -40px 40px 40px rgba(207, 250, 254, 1)"
            : "",
        }}
      ></div>
      <div
        className="h-8 w-12 overflow-hidden rounded-t-full bg-black shadow-cyan-100"
        style={{
          animation: animateLight ? "fadeInShadow .4s ease-in 2s forwards" : "",
          boxShadow: !animateLight
            ? "1px -40px 40px 40px rgba(207, 250, 254, 1)"
            : "",
        }}
      ></div>
    </>
  );
}
