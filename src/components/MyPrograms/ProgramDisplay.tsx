import React from "react";
import H2Title from "./H2Title";
import EmptyFavPrograms from "./EmptyFavPrograms";
import ScrollingDivide from "./ScrollingDivide";
import EmptyCustomPrograms from "./EmptyCustomPrograms";

export default function ProgramDisplay({
  programDisplay,
  addCustomButton,
  customProgramDisplay,
}: {
  programDisplay: React.JSX.Element[] | undefined;
  addCustomButton: React.JSX.Element;
  customProgramDisplay: React.JSX.Element[];
}) {
  const delayStyle = {
    opacity: "0",
    animation: "fadeIn 1s linear 1.5s forwards",
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center transition-all">
        <div
          className="flex w-full justify-center"
          style={{ animation: "fadeInTranslate 1s linear" }}
        >
          <H2Title text="Saved Programs" icon="star" id="favsHeader" />
        </div>

        {programDisplay && programDisplay.length > 0 ? (
          <div
            className="w-11/12 mobileMenu:w-7/12"
            style={{ animation: "flyInFadeIn 1s linear" }}
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
        />
        {addCustomButton}
        {customProgramDisplay.length > 0 ? (
          <div
            className="w-11/12 mobileMenu:w-7/12"
            style={{ animation: "flyInFadeIn 1s linear" }}
          >
            {customProgramDisplay}
          </div>
        ) : (
          <div className="w-7/12 text-center italic">
            <EmptyCustomPrograms />
          </div>
        )}
      </div>
    </>
  );
}
