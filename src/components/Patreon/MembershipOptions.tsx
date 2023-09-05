import React from "react";
import ContactLink from "./ContactLink";

export default function MembershipOptions() {
  return (
    <div className="mb-5 flex w-11/12 max-w-2xl flex-col mobileMenu:w-4/6">
      <div className="flex flex-col">
        <h2 className="mt-10 flex flex-col text-4xl font-semibold">
          Member Perks
        </h2>
        <div className="my-3 flex w-full justify-center mobileMenu:justify-end">
          <a
            href="https://www.patreon.com/actsingdancerepeat/membership"
            target="_blank"
          >
            <button className=" rounded-full border-2 border-cyan-200 p-5 text-lg shadow-md shadow-indigo-400 transition-all hover:scale-110 hover:border-indigo-400 mobileMenu:place-self-end">
              Subscribe Here!
            </button>
          </a>
        </div>
      </div>

      <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
        "Artist" - 4.00/Month
        <ul className="mt-2 list-inside list-disc pl-2 text-left font-normal mobileMenu:pl-10">
          <li>Add notes to your saved programs</li>
          <li>Add custom programs</li>
        </ul>
      </div>
      <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
        "Studio" - 10.00/Month
        <ul className="mt-2 list-inside list-disc pl-2 text-left font-normal mobileMenu:pl-10">
          <li>Add notes to your saved programs</li>
          <li>Add custom programs</li>
          <li>
            1 Upgraded Part-Time Program listing (<ContactLink /> for
            requirements)
          </li>
        </ul>
      </div>
      <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
        "Institution" - 30.00/Month
        <ul className="mt-2 list-inside list-disc pl-2 text-left font-normal mobileMenu:pl-10">
          <li>Add notes to your saved programs</li>
          <li>Add custom programs</li>
          <li>
            Up to 6 Upgraded Part-Time or Full-Time Program listings for 1
            institution (<ContactLink /> for requirements)
          </li>
        </ul>
      </div>
    </div>
  );
}
