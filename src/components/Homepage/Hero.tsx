// import React, { useState, useEffect } from "react";
// import { disciplines } from "@component/data/constants";

// export default function Hero() {
//   const [featuredText, setFeaturedText] = useState(disciplines[0]);

//   useEffect(() => {
//     if (featuredText) {
//       let currentIndex = disciplines.indexOf(featuredText);
//       if (currentIndex || currentIndex === 0) {
//         if (disciplines[currentIndex + 1]) {
//           setTimeout(() => {
//             setFeaturedText(disciplines[currentIndex + 1]);
//           }, 3000);
//         } else {
//           setTimeout(() => {
//             setFeaturedText(disciplines[0]);
//           }, 3000);
//         }
//       }
//     }
//   }, [featuredText]);

//   useEffect(() => {
//     setTimeout(() => {
//       setFeaturedText(disciplines[1]);
//     }, 3000);
//   }, []);

//   return (
//     <div className="m-10 flex flex-col place-items-center">
//       <div className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
//         SO YOU WANNA BE IN
//       </div>
//       {featuredText === "act" && (
//         <div
//           className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
//           style={{ animation: "flyIn 1s ease-in-out forwards" }}
//         >
//           ACTING?
//         </div>
//       )}
//       {featuredText === "sing" && (
//         <div
//           className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
//           style={{ animation: "flyIn 1s ease-in-out forwards" }}
//         >
//           SINGING?
//         </div>
//       )}

//       {featuredText === "dance" && (
//         <div
//           className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
//           style={{ animation: "flyIn 1s ease-in-out forwards" }}
//         >
//           DANCING?
//         </div>
//       )}

//       {featuredText === "mt" && (
//         <div
//           className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
//           style={{ animation: "flyIn 1s ease-in-out forwards" }}
//         >
//           MUSICAL THEATRE?
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { disciplines } from "@component/data/constants";

// export default function Hero() {
//   const [featuredText, setFeaturedText] = useState(disciplines[0]);
//   const [isFlyingIn, setIsFlyingIn] = useState(true);

//   useEffect(() => {
//     if (featuredText) {
//       let currentIndex = disciplines.indexOf(featuredText);
//       if (currentIndex || currentIndex === 0) {
//         if (disciplines[currentIndex + 1]) {
//           setTimeout(() => {
//             setIsFlyingIn(false);
//             setTimeout(() => {
//               setFeaturedText(disciplines[currentIndex + 1]);
//               setIsFlyingIn(true);
//             }, 1000); // Wait for the fly-out animation to complete
//           }, 3000);
//         } else {
//           setTimeout(() => {
//             setIsFlyingIn(false);
//             setTimeout(() => {
//               setFeaturedText(disciplines[0]);
//               setIsFlyingIn(true);
//             }, 1000); // Wait for the fly-out animation to complete
//           }, 3000);
//         }
//       }
//     }
//   }, [featuredText]);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsFlyingIn(true);
//       setFeaturedText(disciplines[1]);
//     }, 3000);
//   }, []);

//   return (
//     <div className="m-10 flex flex-col place-items-center">
//       <div className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
//         SO YOU WANNA BE IN
//       </div>
//       {featuredText === "act" && (
//         <div
//           className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
//           style={{
//             animation: isFlyingIn
//               ? "flyIn 1s ease-in-out forwards"
//               : "flyOut 1s ease-in-out forwards",
//           }}
//         >
//           ACTING?
//         </div>
//       )}
//       {featuredText === "sing" && (
//         <div
//           className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
//           style={{
//             animation: isFlyingIn
//               ? "flyIn 1s ease-in-out forwards"
//               : "flyOut 1s ease-in-out forwards",
//           }}
//         >
//           SINGING?
//         </div>
//       )}

//       {featuredText === "dance" && (
//         <div
//           className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
//           style={{
//             animation: isFlyingIn
//               ? "flyIn 1s ease-in-out forwards"
//               : "flyOut 1s ease-in-out forwards",
//           }}
//         >
//           DANCING?
//         </div>
//       )}

//       {featuredText === "mt" && (
//         <div
//           className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
//           style={{
//             animation: isFlyingIn
//               ? "flyIn 1s ease-in-out forwards"
//               : "flyOut 1s ease-in-out forwards",
//           }}
//         >
//           MUSICAL THEATRE?
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { disciplines } from "@component/data/constants";

// export default function Hero() {
//   const [featuredText, setFeaturedText] = useState<string>(
//     disciplines[0] || "act"
//   );
//   const [animation, setAnimation] = useState("flyIn 1s ease-in-out forwards");

//   useEffect(() => {
//     let currentIndex = disciplines.indexOf(featuredText);
//     if (currentIndex || currentIndex === 0) {
//       if (disciplines[currentIndex + 1]) {
//         setTimeout(() => {
//           setAnimation("flyOut 1s ease-in-out forwards");
//           setTimeout(() => {
//             setFeaturedText(disciplines[currentIndex + 1] || "act");
//             setAnimation("flyIn 1s ease-in-out forwards");
//           }, 1000); // Wait for the fly-out animation to complete
//         }, 3000);
//       } else {
//         setTimeout(() => {
//           setAnimation("flyOut 1s ease-in-out forwards");
//           setTimeout(() => {
//             setFeaturedText(disciplines[0] || "act");
//             setAnimation("flyIn 1s ease-in-out forwards");
//           }, 1000); // Wait for the fly-out animation to complete
//         }, 3000);
//       }
//     }
//   }, [featuredText]);

//   useEffect(() => {
//     setTimeout(() => {
//       setAnimation("flyOut 1s ease-in-out forwards");
//       setTimeout(() => {
//         setFeaturedText(disciplines[1] || "sing");
//         setAnimation("flyIn 1s ease-in-out forwards");
//       }, 1000); // Wait for the fly-out animation to complete
//     }, 3000);
//   }, []);

//   return (
//     <div className="m-10 flex flex-col place-items-center">
//       <div className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
//         SO YOU WANNA BE IN
//       </div>
//       <div
//         className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
//         style={{
//           animation,
//         }}
//       >
//         {featuredText === "act" && "ACTING?"}
//         {featuredText === "sing" && "SINGING?"}
//         {featuredText === "dance" && "DANCING?"}
//         {featuredText === "mt" && "MUSICAL THEATRE?"}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { disciplines } from "@component/data/constants";

export default function Hero() {
  const [featuredText, setFeaturedText] = useState<string>(
    disciplines[0] || "act"
  );
  const [animation, setAnimation] = useState("flyIn 1s ease-in-out forwards");

  useEffect(() => {
    const currentIndex = disciplines.indexOf(featuredText);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % disciplines.length;
      setTimeout(() => {
        setAnimation("wiggle .5s linear infinite");
        setTimeout(() => {
          setAnimation("flyOut .5s ease-in-out forwards");
          setTimeout(() => {
            setFeaturedText(disciplines[nextIndex]);
            setAnimation("flyIn 1s ease-in-out forwards");
          }, 500); // Wait for the fly-out animation to complete
        }, 1700); // Wait for the wiggle animation to complete
      }, 1000);
    }
  }, [featuredText]);

  useEffect(() => {
    setTimeout(() => {
      setAnimation("wiggle .5s linear infinite");
      setTimeout(() => {
        setAnimation("flyOut .5s ease-in-out forwards");
        setTimeout(() => {
          setFeaturedText(disciplines[1] || "sing");
          setAnimation("flyIn 1s ease-in-out forwards");
        }, 500); // Wait for the fly-out animation to complete
      }, 1700); // Wait for the wiggle animation to complete
    }, 1000);
  }, []);

  return (
    <div className="m-10 flex flex-col place-items-center">
      <div className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        SO YOU WANNA BE IN
      </div>
      <div
        className="hero-phrase m-5 text-5xl font-extrabold sm:text-[6rem]"
        style={{
          animation,
        }}
      >
        {featuredText === "act" && "ACTING?"}
        {featuredText === "sing" && "SINGING?"}
        {featuredText === "dance" && "DANCING?"}
        {featuredText === "mt" && "MUSICAL THEATRE?"}
      </div>
    </div>
  );
}
