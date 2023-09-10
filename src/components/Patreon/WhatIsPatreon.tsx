import React, { useState } from "react";
import StudentMembership from "./StudentMembership";
import ProgramMembership from "./ProgramMembership";

export default function WhatIsPatreon() {
  const [patreonExplain, setPatreonExplain] = useState("");
  return (
    <div
      className="mb-5 flex w-11/12 max-w-2xl flex-col opacity-0 mobileMenu:w-4/6"
      style={{ animation: "pullDownTop 0.3s linear 2.5s forwards" }}
    >
      <div className="flex flex-col">
        <h2 className="mt-10 flex flex-col text-4xl font-semibold">
          What is Patreon?
        </h2>
        <div>
          Patreon is a subscription platform that lets you pay a monthly fee for
          access to extra features or upgrade your listings on this site
        </div>
        <div className="my-10 flex w-full justify-around">
          <button
            onClick={() => setPatreonExplain("student")}
            className="m-2 rounded-full border-2 border-cyan-200 p-5 text-lg shadow-md shadow-indigo-400 transition-all hover:scale-110 hover:border-indigo-400"
          >
            For Students
          </button>{" "}
          <button
            onClick={() => setPatreonExplain("program")}
            className="m-2 rounded-full border-2 border-cyan-200 p-5 text-lg shadow-md shadow-indigo-400 transition-all hover:scale-110 hover:border-indigo-400"
          >
            For Programs
          </button>
        </div>
        {patreonExplain === "student" && <StudentMembership />}
        {patreonExplain === "program" && <ProgramMembership />}
      </div>
    </div>
  );
}
