import React, { useEffect, useState, useLayoutEffect } from "react";
import { arrowUpRightCorner, arrowUp } from "@component/data/svgs";

export default function SinglePageHeader({
  isSignedIn,
  programId,
}: {
  isSignedIn: boolean;
  programId: string;
}) {
  const contentObject = {
    signedIn: {
      textHeader: "Add to Faves by Clicking the Star",
      arrowUpWrapperClass:
        "place-self-center md:translate-x-32 translate-x-20 xs:translate-x-24 translate-y-20 rotate-45 w-fit scale-150 opacity-0",
      arrowUpDivClass: "w-fit mt-1 text-cyan-900 h-0 text-cyan-900",
      arrowUpAnimation: "upDown 1s linear 2.3s 3 forwards",
    },
    signedOut: {
      textHeader: "Sign in to Save Program",
      arrowUpWrapperClass:
        "mr-3 xs:mr-1 sm:rotate-45 sm:mr-16 md:translate-y-3 w-fit scale-150 place-self-end mobileMenu:hidden opacity-0",
      arrowUpDivClass: "",
      arrowUpAnimation: "fadeInTranslate 2s linear 2.3s forwards",
    },
  };

  return (
    <div
      className="m-3 flex w-11/12  flex-col text-center text-3xl font-extrabold text-cyan-900 opacity-0 mobileMenu:flex-row mobileMenu:text-4xl lg:m-10 3xl:p-5"
      style={{ animation: "expandUp 1s linear 1.5s forwards" }}
    >
      <div className="-mb-10 w-11/12 place-self-center mobileMenu:mb-0">
        {isSignedIn
          ? contentObject.signedIn.textHeader
          : contentObject.signedOut.textHeader}
      </div>

      <div
        className="ml-3 hidden w-fit rotate-12 place-self-end opacity-0 mobileMenu:block"
        style={{ animation: "fadeIn 1s linear 2s forwards" }}
      >
        {arrowUpRightCorner}
      </div>
      <div
        className={
          isSignedIn
            ? contentObject.signedIn.arrowUpWrapperClass
            : contentObject.signedOut.arrowUpWrapperClass
        }
        style={{
          animation: "fadeIn 1s linear 2.3s forwards",
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
