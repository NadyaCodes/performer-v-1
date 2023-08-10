import React from "react";

export default function SubHeader({ text }: { text: string }) {
  return (
    <div
      className="mt-3 flex w-screen justify-center bg-gradient-to-b from-indigo-100 to-indigo-300 text-cyan-950 shadow-lg shadow-cyan-900"
      style={{ animation: "flyInFadeIn 0.5s linear forwards" }}
    >
      <div
        className="opacity-0"
        style={{ animation: "flyInFadeIn 1s linear 0.3s forwards" }}
      >
        <div style={{ animation: "translateUpToDown 1s linear 0.3s forwards" }}>
          <div
            className="flex p-5 text-4xl font-bold"
            style={{ animation: "rotateSwell 1s linear 0.3s forwards" }}
          >
            <div>{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
