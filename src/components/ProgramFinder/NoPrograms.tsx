import React from "react";

export default function NoPrograms() {
  return (
    <div className="m-1 flex w-11/12 flex-col place-self-center pt-4 text-center text-lg font-bold text-cyan-900 md:w-10/12 md:text-2xl lg:-ml-40 lg:w-full lg:pr-16 lg:pt-16">
      <div
        className="m-2 flex scale-90 place-self-center text-cyan-400 opacity-0 md:mt-10"
        style={{ animation: "fadeIn .8s forwards" }}
      >
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear infinite" }}
        >
          .
        </div>
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear .2s infinite" }}
        >
          .
        </div>
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear .4s infinite" }}
        >
          .
        </div>
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear .6s infinite" }}
        >
          s
        </div>
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear .8s infinite" }}
        >
          i
        </div>
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear 1s infinite" }}
        >
          g
        </div>
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear 1.2s infinite" }}
        >
          h
        </div>
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear 1.4s infinite" }}
        >
          .
        </div>{" "}
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear 1.6s infinite" }}
        >
          .
        </div>{" "}
        <div
          className="px-1"
          style={{ animation: "upDown 1.5s linear 1.8s infinite" }}
        >
          .
        </div>
      </div>
      <div
        className="m-2 opacity-0"
        style={{ animation: "pullDownTop .6s forwards .7s" }}
      >
        There are no programs that match your queries.
      </div>
      <div
        className="m-2 mb-10 text-cyan-600 opacity-0"
        style={{ animation: "pullDownTop .6s 1.2s forwards" }}
      >
        Please broaden your search and try again.
      </div>
    </div>
  );
}
