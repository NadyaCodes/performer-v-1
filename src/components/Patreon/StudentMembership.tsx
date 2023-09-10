// import React from "react";
// import PatreonSubscribeButton from "./PatreonSubscribeButton";

// export default function StudentMembership() {
//   return (
//     <div className="mb-5 flex max-w-2xl flex-col">
//       <div className="flex flex-col">
//         <h2 className="flex flex-col text-4xl font-semibold">
//           Membership Perks for Students
//         </h2>
//       </div>

//       <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
//         &quot;Artist&quot; - 4.00/Month
//         <ul className="mt-2 list-inside list-disc pl-2 text-left font-normal mobileMenu:pl-10">
//           <li>Add notes to your saved programs</li>
//           <li>Add custom programs</li>
//         </ul>
//       </div>
//       <PatreonSubscribeButton />
//     </div>
//   );
// }

import React, { useEffect, useRef } from "react";
import PatreonSubscribeButton from "./PatreonSubscribeButton";

export default function StudentMembership() {
  const studentMembershipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (studentMembershipRef.current) {
      studentMembershipRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={studentMembershipRef} className="mb-5 flex max-w-2xl flex-col">
      <div className="flex flex-col">
        <h2 className="flex flex-col text-4xl font-semibold">
          Membership Perks for Students
        </h2>
      </div>

      <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
        &quot;Artist&quot; - 4.00/Month
        <ul className="mt-2 list-inside list-disc pl-2 text-left font-normal mobileMenu:pl-10">
          <li>Add notes to your saved programs</li>
          <li>Add custom programs</li>
        </ul>
      </div>
      <PatreonSubscribeButton />
    </div>
  );
}
