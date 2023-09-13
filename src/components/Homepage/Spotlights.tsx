import React from "react";

export default function Spotlights() {
  return (
    <div className="flex -translate-y-8 justify-center">
      <div className="xl:translate-x-10 2xl:translate-x-40">
        <div className="translate-x-24 xs:translate-x-40 sm:translate-x-52 md:translate-x-72 xl:translate-x-96">
          <div
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: "130px solid transparent",
              borderRight: "130px solid transparent",
              borderBottom: "1200px solid #cffafe40",
              animation: "spotlightRight 2s linear forwards",
              overflow: "hidden",
            }}
          ></div>

          <div
            style={{
              translate: "86px 10px",
            }}
          >
            <div
              style={{ animation: "spotlightRightLight 2s linear forwards" }}
            >
              <div className="h-20 w-10 rounded-full">
                <div
                  className="h-full w-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(to top, black 70%, transparent 50%)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="3xl:-translate-x-10">
        <div className="-translate-x-0 xs:-translate-x-6 sm:-translate-x-20 md:-translate-x-32 xl:-translate-x-64 2xl:-translate-x-96">
          <div className="-translate-x-80 xs:-translate-x-86 sm:-translate-x-96">
            <div
              className="absolute"
              style={{
                width: 0,
                height: 0,
                borderLeft: "130px solid transparent",
                borderRight: "130px solid transparent",
                borderBottom: "1200px solid #cffafe40",
                animation: "spotlightLeft 2s linear forwards",
                overflow: "hidden",
              }}
            ></div>
            <div
              className=""
              style={{
                translate: "133px 10px",
              }}
            >
              <div
                style={{ animation: "spotlightLeftLight 2s linear forwards" }}
              >
                <div className="h-20 w-10 rounded-full">
                  <div
                    className="h-full w-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(to top, black 70%, transparent 50%)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
