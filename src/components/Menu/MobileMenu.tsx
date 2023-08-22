import React, { useState, useEffect } from "react";
import LogoTicker from "../About/LogoTicker";
import MenuBubble from "./MenuBubble";
import MobileMenuOpen from "./MobileMenuOpen";

export default function MobileMenu() {
  const [viewMenu, setViewMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [banner, setBanner] = useState(false);
  const [bgTop, setbgTop] = useState("bg-cyan-50");

  useEffect(() => {
    const currentURL = window.location.href;
    let isDarkURL = true;
    const lightPages = ["course-selector", "about"];
    const darkCyanPages = ["course-finder"];
    const slatePages = ["contact"];

    lightPages.forEach((urlSnippet) => {
      if (currentURL.includes(urlSnippet)) {
        isDarkURL = false;
      }
    });
    if (
      currentURL.includes("about") ||
      currentURL.includes("contact") ||
      currentURL.includes("course-finder") ||
      currentURL.includes("course-selector") ||
      currentURL.includes("select-next")
    ) {
      setBanner(true);
    }

    slatePages.forEach((page) => {
      if (currentURL.includes(page)) {
        setbgTop("bg-slate-900");
      }
    });

    darkCyanPages.forEach((page) => {
      if (currentURL.includes(page)) {
        setbgTop("bg-cyan-900");
      }
    });

    setDark(isDarkURL);
  }, []);

  return (
    <div>
      <div className="flex w-full flex-col items-end">
        <div
          className={`relative z-40 flex h-4 w-full flex-col ${
            !banner && " -translate-y-4"
          }`}
          style={{
            boxShadow: `0px 1px 2px rgba(0,255,255,0.5), 0px 2px 4px rgba(0,255,255,0.5), 0px 4px 8px rgba(0,255,255,0.5), 0px 8px 16px rgba(0,255,255,0.5)`,
          }}
        ></div>
        <div
          className={`absolute z-50 flex h-4 w-full flex-col ${bgTop} ${
            !banner && " -translate-y-4"
          }`}
        ></div>
        {banner && (
          <div className="block w-screen">
            <LogoTicker />
          </div>
        )}
        <div>
          <div className={`${viewMenu ? "" : "hidden"}`}>
            <MobileMenuOpen setViewMenu={setViewMenu} />
          </div>
          <div className={`${viewMenu ? "opacity-0" : ""}`}>
            <MenuBubble
              dark={dark}
              viewMenu={viewMenu}
              setViewMenu={setViewMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
