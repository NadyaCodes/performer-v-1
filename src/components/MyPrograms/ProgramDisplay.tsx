import React from "react";
import H2Title from "./H2Title";
import EmptyFavPrograms from "./EmptyFavPrograms";
import ScrollingDivide from "./ScrollingDivide";
import EmptyCustomPrograms from "./EmptyCustomPrograms";
import { usePatreon } from "@component/contexts/PatreonContext";
import CustomNoPatreon from "./CustomNoPatreon";

export default function ProgramDisplay({
  programDisplay,
  addCustomButton,
  customProgramDisplay,
  favHeaderRef,
  customHeaderRef,
  flyIn,
}: {
  programDisplay: React.JSX.Element[] | undefined;
  addCustomButton: React.JSX.Element;
  customProgramDisplay: React.JSX.Element[];
  favHeaderRef: React.RefObject<HTMLDivElement>;
  customHeaderRef: React.RefObject<HTMLDivElement>;
  flyIn: boolean;
}) {
  const delayStyle = {
    opacity: "0",
    animation: "fadeIn 1s linear 1.5s forwards",
  };

  const { patreonInfo } = usePatreon();

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center transition-all">
        <div
          className="flex w-full justify-center"
          style={{ animation: flyIn ? "fadeInTranslate 1s linear" : "" }}
        >
          <H2Title
            text="Saved Programs"
            icon="star"
            id="favHeader"
            ref={favHeaderRef}
          />
        </div>

        {programDisplay && programDisplay.length > 0 ? (
          <div
            className="w-11/12 mobileMenu:w-7/12"
            style={{ animation: flyIn ? "flyInFadeIn 1s linear" : "" }}
          >
            {programDisplay}
          </div>
        ) : (
          <div className="mt-10 w-11/12 mobileMenu:w-7/12">
            <EmptyFavPrograms />
          </div>
        )}
        <ScrollingDivide />
        <H2Title
          text="Custom Programs"
          icon="sparkle"
          style={delayStyle}
          id="customHeader"
          color="indigo"
          ref={customHeaderRef}
        />

        {patreonInfo && addCustomButton}
        {patreonInfo && patreonInfo.id ? (
          customProgramDisplay.length > 0 ? (
            <div
              className="w-11/12 mobileMenu:w-7/12"
              style={{ animation: flyIn ? "flyInFadeIn 1s linear" : "" }}
            >
              {customProgramDisplay}
            </div>
          ) : (
            <div className="w-11/12 text-center italic mobileMenu:w-7/12">
              <EmptyCustomPrograms />
            </div>
          )
        ) : (
          <CustomNoPatreon />
        )}
      </div>
    </>
  );
}
