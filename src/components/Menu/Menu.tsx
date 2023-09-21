import React from "react";
import dynamic from "next/dynamic";

const FullMenu = dynamic(() => import("./FullMenu"), {
  ssr: true,
});

const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: true,
});

export type menuObject = {
  name: string;
  link: string;
  toolTipItem?: string;
};

export const menuItems: menuObject[] = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Program Finder", link: "/program-finder", toolTipItem: "finderTip" },
  {
    name: "Program Directory",
    link: "/program-directory",
    toolTipItem: "directoryTip",
  },
  { name: "My Programs", link: "/my-programs", toolTipItem: "programsTip" },
  { name: "Blog", link: "/blog" },
  { name: "Patreon", link: "/patreon", toolTipItem: "patreonTip" },
  { name: "Merch", link: "/merch" },
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
