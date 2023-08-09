import { arrowUp } from "@component/data/svgs";
import React, { useState, useEffect } from "react";

export default function ScrollArrow() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setShowArrow(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className="sticky top-3/4 text-indigo-800 transition-all"
      onClick={() => scrollToTop()}
    >
      {showArrow && (
        <div
          className=" mt-6 flex flex-col items-center justify-center transition-all"
          style={{ animation: "fadeIn 1s linear" }}
        >
          <div className="scale-125 rounded-full border border-indigo-800 p-4  transition-all hover:scale-150 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-md hover:shadow-indigo-300">
            {arrowUp}
          </div>
          <div className="mt-5">Scroll To Top</div>
        </div>
      )}
    </div>
  );
}
