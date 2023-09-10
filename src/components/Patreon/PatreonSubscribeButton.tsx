import React from "react";

export default function PatreonSubscribeButton() {
  return (
    <div className="my-3 flex w-full justify-center">
      <a
        href="https://www.patreon.com/actsingdancerepeat/membership"
        target="_blank"
      >
        <button className="my-5 rounded-full bg-indigo-200 p-5 text-lg text-indigo-900 shadow-md shadow-indigo-500 transition-all hover:scale-110 hover:shadow-indigo-400">
          Subscribe Here!
        </button>
      </a>
    </div>
  );
}
