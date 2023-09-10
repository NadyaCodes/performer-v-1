import React from "react";
import { arrowUp } from "@component/data/svgs";

export default function SinglePageHeader({
  isSignedIn,
}: {
  isSignedIn: boolean;
}) {
  const contentObject = {
    signedIn: {
      textHeader: "Add to Faves by Clicking the Star",
      arrowUpWrapperClass:
        "place-self-center translate-x-20 xs:translate-x-24 md:translate-x-28 lg:-translate-x-52 translate-y-18 rotate-45 w-fit scale-150 opacity-0",
      arrowUpDivClass: "-fit mt-1 text-cyan-900 h-0 text-cyan-800",
      arrowUpAnimation: "upDown 1s linear 1.5s 3 forwards",
    },
    signedOut: {
      textHeader: "Sign in to Save Program",
      arrowUpWrapperClass:
        "mr-3 xs:mr-1 sm:rotate-45 sm:mr-16 md:translate-y-3 mobileMenu:-translate-y-20 mobileMenu:m-0 mobileMenu:translate-x-5 xl:translate-x-16 w-fit scale-150 place-self-end opacity-0",
      arrowUpDivClass: "text-cyan-800",
      arrowUpAnimation: "fadeInTranslate 2s linear 2.5s forwards",
    },
  };

  return (
    <div
      className="m-0 flex w-11/12 flex-col justify-center text-center text-3xl font-bold text-cyan-900 opacity-0 mobileMenu:m-6 mobileMenu:w-9/12 mobileMenu:flex-row mobileMenu:text-4xl xl:text-5xl 3xl:p-5"
      style={{ animation: "flyInFadeIn 1s linear 1.5s forwards" }}
    >
      <div className="-mb-10 w-11/12 place-self-center xs:-mb-6 mobileMenu:mb-10">
        {isSignedIn
          ? contentObject.signedIn.textHeader
          : contentObject.signedOut.textHeader}
      </div>
      <div
        className={
          isSignedIn
            ? contentObject.signedIn.arrowUpWrapperClass
            : contentObject.signedOut.arrowUpWrapperClass
        }
        style={{
          animation: "fadeIn 0.5s linear 2.5s forwards",
        }}
      >
        <div className={isSignedIn ? "rotate-90" : ""}>
          <div
            className={
              isSignedIn
                ? contentObject.signedIn.arrowUpDivClass
                : contentObject.signedOut.arrowUpDivClass
            }
            style={{
              animation: isSignedIn
                ? contentObject.signedIn.arrowUpAnimation
                : contentObject.signedOut.arrowUpAnimation,
              opacity: "inherit",
            }}
          >
            {arrowUp}
          </div>
        </div>
      </div>
    </div>
  );
}
