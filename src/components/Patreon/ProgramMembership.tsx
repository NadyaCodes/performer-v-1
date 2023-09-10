import React, { useRef, useEffect } from "react";
import PatreonSubscribeButton from "./PatreonSubscribeButton";
import ContactLink from "./ContactLink";
import Image from "next/image";

export default function ProgramMembership() {
  const programMembershipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (programMembershipRef.current) {
      programMembershipRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="mb-5 flex max-w-2xl flex-col" ref={programMembershipRef}>
      <div className="mt-5 flex flex-col">
        <h2 className="my-2 flex flex-col text-4xl font-semibold">
          Membership Perks for Programs
        </h2>
      </div>
      <div>
        Help students fall in love with your program with{" "}
        <span className="font-semibold text-indigo-200">Upgraded Listings</span>
      </div>
      <div className="my-5 flex items-center">
        <div className="m-2 overflow-hidden rounded">
          <Image
            src="/Featured-Listing.png"
            alt="Patreon Featured Listing Example"
            width={510}
            height={300}
          />
        </div>
        <ul className="list-outside list-disc pl-10 text-left">
          <li className="m-2">Golden border</li>
          <li className="m-2">More information on primary listing</li>
          <li className="m-2">Up to 80 words</li>
          <li className="m-2">
            "More Info" Link to expanded blog article (optional)
          </li>
        </ul>
      </div>
      <div className="my-5 flex items-center">
        <div className="m-2 overflow-hidden rounded">
          <Image
            src="/Featured-Blog.png"
            alt="Patreon Featured Listing Example"
            width={430}
            height={200}
          />
        </div>
        <ul className="list-outside list-disc pl-10 text-left">
          <li className="m-2">Blog-Post-Style Article</li>
          <li className="m-2">Linked off "More Info" in public listing</li>
          <li className="m-2">Customizable formatting for headers, etc.</li>
          <li className="m-2">Up to 2000 words</li>
        </ul>
      </div>

      <h2 className="my-2 mt-10 flex flex-col text-4xl font-semibold">
        Pricing
      </h2>

      <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
        &quot;Studio&quot; - 10.00/Month
        <ul className="mt-2 list-inside list-disc pl-2 text-left font-normal mobileMenu:pl-10">
          <li>1 Upgraded Part-Time Program listing</li>
          <li>All Student Patreon Perks</li>
          <li>
            <ContactLink /> for more details!
          </li>
        </ul>
      </div>
      <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
        &quot;Institution&quot; - 30.00/Month
        <ul className="mt-2 list-inside list-disc pl-2 text-left font-normal mobileMenu:pl-10">
          <li>
            Up to 6 Upgraded Part-Time or Full-Time Program listings for 1
            institution
          </li>
          <li>All Student Patreon Perks</li>
          <li>
            <ContactLink /> for more details!
          </li>
        </ul>
      </div>
      <PatreonSubscribeButton />
    </div>
  );
}
