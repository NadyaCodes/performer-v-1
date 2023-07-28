import React from "react";

export default function LoadingDotBounce({ dotColor }: { dotColor: string }) {
  const circleClass = `circle ${dotColor}-circle`;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-4/12">
        <div className="">
          <div className={circleClass}></div>
          <div className={circleClass}></div>
          <div className={circleClass}></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      </div>
      <div className="translate-y-[6rem] font-bold text-gray-400">Loading</div>
    </div>
  );
}
