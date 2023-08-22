import React from "react";

export default function SmallLights({
  animateLight,
}: {
  animateLight: boolean;
}) {
  return (
    <>
      <div
        className="h-5 w-7 overflow-hidden rounded-t-full bg-black shadow-cyan-100 sm:h-8 sm:w-12"
        style={{
          animation: animateLight
            ? "fadeInSmallShadow .4s ease-in 2s forwards"
            : "",
          boxShadow: !animateLight
            ? "1px -10px 30px 20px rgba(207, 250, 254, 1)"
            : "",
        }}
      ></div>
      <div
        className="h-5 w-7 overflow-hidden rounded-t-full bg-black shadow-cyan-100 sm:h-8 sm:w-12"
        style={{
          animation: animateLight
            ? "fadeInSmallShadow .4s ease-in 2s forwards"
            : "",
          boxShadow: !animateLight
            ? "1px -10px 30px 20px rgba(207, 250, 254, 1)"
            : "",
        }}
      ></div>
      <div
        className="h-5 w-7 overflow-hidden rounded-t-full bg-black shadow-cyan-100 sm:h-8 sm:w-12"
        style={{
          animation: animateLight
            ? "fadeInSmallShadow .4s ease-in 2s forwards"
            : "",
          boxShadow: !animateLight
            ? "1px -10px 30px 20px rgba(207, 250, 254, 1)"
            : "",
        }}
      ></div>
    </>
  );
}
