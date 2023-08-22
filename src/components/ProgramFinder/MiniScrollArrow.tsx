import { arrowUp } from "@component/data/svgs";
import React, { useState, useEffect } from "react";

export default function MiniScrollArrow() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 900;
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
      className="w-fit scale-75 rounded-full transition-all"
      onClick={() => scrollToTop()}
      id="mini_scroll_arrow"
    >
      {showArrow && (
        <div
          className="flex flex-col items-center justify-center transition-all"
          style={{ animation: "fadeIn 1s linear" }}
        >
          <div className="rounded-full border border-indigo-800 bg-indigo-200 bg-opacity-80 p-4 text-indigo-900  transition-all hover:scale-125 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-md hover:shadow-indigo-300">
            {arrowUp}
          </div>
        </div>
      )}
    </div>
  );
}
