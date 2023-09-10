import React, { useRef, useEffect } from "react";
import PatreonSubscribeButton from "./PatreonSubscribeButton";
import ContactLink from "./ContactLink";

export default function ProgramMembership() {
  const programMembershipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (programMembershipRef.current) {
      programMembershipRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="mb-5 flex max-w-2xl flex-col" ref={programMembershipRef}>
      <div className="flex flex-col">
        <h2 className="flex flex-col text-4xl font-semibold">
          Membership Perks for Programs
        </h2>
      </div>

      <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
        &quot;Studio&quot; - 10.00/Month
        <ul className="mt-2 list-inside list-disc pl-2 text-left font-normal mobileMenu:pl-10">
          <li>
            1 Upgraded Part-Time Program listing (<ContactLink /> for
            requirements)
          </li>
          <li>All Student Patreon Perks</li>
        </ul>
      </div>
      <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
        &quot;Institution&quot; - 30.00/Month
        <ul className="mt-2 list-inside list-disc pl-2 text-left font-normal mobileMenu:pl-10">
          <li>
            Up to 6 Upgraded Part-Time or Full-Time Program listings for 1
            institution (<ContactLink /> for requirements)
          </li>
          <li>All Student Patreon Perks</li>
        </ul>
      </div>
      <PatreonSubscribeButton />
    </div>
  );
}
