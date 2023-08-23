import React, { useEffect, useState, useLayoutEffect } from "react";
import { arrowUpRightCorner, arrowUp } from "@component/data/svgs";

export default function SinglePageHeader({
  isSignedIn,
}: {
  isSignedIn: boolean;
}) {
  const contentObject = {
    signedIn: {
      textHeader: "Add to Faves by Clicking the Star",
      arrowUpWrapperClass:
        "place-self-center translate-x-20 xs:translate-x-24 md:translate-x-32 mobileMenu:-translate-x-20 lg:-translate-x-24  2xl:-translate-x-28 translate-y-20 rotate-45 w-fit scale-150 opacity-0",
      arrowUpDivClass: "w-fit mt-1 text-cyan-900 h-0 text-cyan-900",
      arrowUpAnimation: "upDown 1s linear 3s 3 forwards",
    },
    signedOut: {
      textHeader: "Sign in to Save Program",
      arrowUpWrapperClass:
        "mr-3 xs:mr-1 sm:rotate-45 sm:mr-16 md:translate-y-3 mobileMenu:-translate-y-20 mobileMenu:m-0 mobileMenu:translate-x-5 xl:translate-x-16 w-fit scale-150 place-self-end opacity-0",
      arrowUpDivClass: "",
      arrowUpAnimation: "fadeInTranslate 2s linear 3s forwards",
    },
  };

  return (
    <div
      className="m-3 flex w-11/12 flex-col justify-center text-center text-3xl font-extrabold text-cyan-900 opacity-0 mobileMenu:w-9/12 mobileMenu:flex-row mobileMenu:text-4xl lg:m-10 xl:text-5xl 3xl:p-5"
      style={{ animation: "expandUp 1s linear 1.5s forwards" }}
    >
      <div className="-mb-10 w-11/12 mobileMenu:mb-0">
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
          animation: "fadeIn 1s linear 3s forwards",
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
