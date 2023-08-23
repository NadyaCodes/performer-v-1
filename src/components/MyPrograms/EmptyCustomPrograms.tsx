import React from "react";
import { basicStar } from "@component/data/svgs";

export default function EmptyCustomPrograms() {
  return (
    <div
      className="relative mb-10 mt-5 flex w-full flex-col rounded-lg bg-indigo-100 bg-opacity-20 opacity-0 shadow-md shadow-indigo-900"
      style={{ animation: "fadeInGrow 0.8s linear 2s forwards" }}
    >
      <div className="flex w-full justify-between rounded-t-lg bg-indigo-900 bg-opacity-100 text-indigo-50 shadow-sm shadow-indigo-900">
        <div className="mx-5 my-2">{basicStar}</div>
        <div className="mx-5 my-2">{basicStar}</div>
      </div>
      <div className="p-4 text-center">
        <div className="p-3">You have no custom programs</div>
      </div>
    </div>
  );
}
