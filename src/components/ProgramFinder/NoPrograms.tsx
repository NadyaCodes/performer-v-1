import React from "react";

export default function NoPrograms() {
  return (
    <div className="flex w-7/12 flex-col pt-16 text-center text-2xl font-bold text-cyan-900">
      <div
        className="opacity-0"
        style={{ animation: "pullDownTop .6s forwards" }}
      >
        There are no programs that match your queries.
      </div>
      <div
        className="text-cyan-600 opacity-0"
        style={{ animation: "pullDownTop .6s .5s forwards" }}
      >
        Please broaden your search and try again.
      </div>

      <div
        className="mt-10 flex scale-90 place-self-center text-cyan-400 opacity-0"
        style={{ animation: "fadeIn .8s 1.5s forwards" }}
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
    </div>
  );
}
