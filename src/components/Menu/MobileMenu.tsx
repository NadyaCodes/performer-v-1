import React, { useState, useEffect } from "react";
import { bars2 } from "@component/data/svgs";
import LogoTicker from "../About/LogoTicker";
import MenuBubble from "./MenuBubble";
import MobileMenuOpen from "./MobileMenuOpen";

export default function MobileMenu() {
  const [viewMenu, setViewMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    const currentURL = window.location.href;
    let isDarkURL = true;
    const lightPages = ["course-finder", "course-selector", "about"];

    lightPages.forEach((urlSnippet) => {
      if (currentURL.includes(urlSnippet)) {
        isDarkURL = false;
      }
    });
    if (currentURL.includes("about") || currentURL.includes("contact")) {
      setBanner(true);
    }
    setDark(isDarkURL);
  }, []);

  return (
    <div>
      <div className="flex w-full flex-col items-end">
        <div
          className="relative z-40 flex h-3 w-full flex-col bg-transparent"
          style={{
            boxShadow: `0px 1px 2px rgba(0,255,255,0.5), 0px 2px 4px rgba(0,255,255,0.5), 0px 4px 8px rgba(0,255,255,0.5), 0px 8px 16px rgba(0,255,255,0.5)`,
          }}
        ></div>
        {banner && (
          <div className="block w-screen">
            <LogoTicker />
          </div>
        )}
        {/* <div
          className={`mx-3 mt-4 flex items-center justify-center rounded-full border-2 ${
            dark
              ? "border-cyan-200 p-2 text-cyan-200"
              : "border-cyan-900 p-2 text-cyan-800"
          } `}
          onClick={() => setViewMenu(!viewMenu)}
        >
          {bars2}
        </div> */}
        {viewMenu ? (
          <MobileMenuOpen viewMenu={viewMenu} setViewMenu={setViewMenu} />
        ) : (
          <MenuBubble
            dark={dark}
            viewMenu={viewMenu}
            setViewMenu={setViewMenu}
          />
        )}
      </div>
    </div>
  );
}
