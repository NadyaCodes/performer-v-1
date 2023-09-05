import React from "react";
import ContactLink from "./ContactLink";

export default function ConnectAccounts({ url }: { url: string }) {
  return (
    <div className="mb-10">
      <h2 className="m-5 text-xl font-semibold">
        Already a patreon subscriber to{" "}
        <span className="font-bold">Act. Sing. Dance. Repeat</span>?
      </h2>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button className="m-2 rounded-full border-2 border-cyan-200 p-5 text-lg shadow-md shadow-indigo-400 transition-all hover:scale-110 hover:border-indigo-400">
          Connect Patreon Account Now
        </button>
      </a>
      <div className="m-2 flex flex-col italic">
        <div>*occasional re-connections may be required.</div>
        <div>
          Please <ContactLink /> regarding any technical difficulties!
        </div>
      </div>
    </div>
  );
}
