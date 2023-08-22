import { arrowUp } from "@component/data/svgs";
import React, { useState, useEffect } from "react";

export default function SelectorScrollArrow() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 400;
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
      className="ml-2 w-fit rounded-full transition-all 2xl:ml-5"
      onClick={() => scrollToTop()}
      id="mini_scroll_arrow"
    >
      {showArrow && (
        <div
          className="flex flex-col items-center justify-center transition-all"
          style={{ animation: "fadeIn 1s linear" }}
        >
          <div className="rounded-full border-2 border-indigo-800 bg-indigo-300 bg-opacity-70 p-4 text-indigo-950  transition-all hover:scale-125 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-md hover:shadow-indigo-300">
            {arrowUp}
          </div>
        </div>
      )}
    </div>
  );
}
