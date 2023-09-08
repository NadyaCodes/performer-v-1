import React from "react";
import FullMenu from "./FullMenu";
import MobileMenu from "./MobileMenu";

export type menuObject = {
  name: string;
  link: string;
  toolTipItem?: string;
};

export const menuItems: menuObject[] = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Course Finder", link: "/course-finder", toolTipItem: "finderTip" },
  {
    name: "Course Selector",
    link: "/course-selector",
    toolTipItem: "selectorTip",
  },
  { name: "My Programs", link: "/my-programs", toolTipItem: "programsTip" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/contact" },
];

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
