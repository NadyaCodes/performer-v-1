import React from "react";
import FullMenu from "./FullMenu";
import MobileMenu from "./MobileMenu";

export default function Menu() {
  return (
    <div className="w-screen">
      <div className="hidden mobileMenu:block">
        <FullMenu />
      </div>
      <div className="mobileMenu:hidden">
        <MobileMenu />
      </div>
    </div>
  );
}
